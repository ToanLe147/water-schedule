import { useState } from 'react'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Fade from '@mui/material/Fade';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { supabase, utilSupaGetImage } from '../supabaseClient';


export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export default function PlantPage({
  open,
  setOpen,
  plantID,
  name,
  plantImage,
  scientificName,
  drinkingDay,
  wateringDate,
  drinkingPortion,
  updatePlantCardImageURL
}) {

  const handleClose = () => {
    reloadEditedInfoValue();
    setEditMode(false);
    setOpen(false);
  };

  const [plantImageURL, setPlantImageURL] = useState(localStorage.getItem(plantImage));
  const [editMode, setEditMode] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({
    scientificName: scientificName,
    drinkingDay: drinkingDay,
    wateringDate: wateringDate,
    drinkingPortion: drinkingPortion
  });
  const [updateNoti, setUpdateNoti] = useState({
    open: false,
    message: 'There is no update',
    severity: 'info'
  });

  const handleUpdateInfo = (event) => {
    setUpdateInfo({
      ...updateInfo,
      [event.target.name]: event.target.value
    });
  }

  const reloadEditedInfoValue = () => {
    setUpdateInfo({
      scientificName: scientificName,
      drinkingDay: drinkingDay,
      wateringDate: wateringDate,
      drinkingPortion: drinkingPortion
    })
  }

  const submitUpdateInfo = async () => {

    var updateStatus = true;

    if (updateInfo.scientificName !== scientificName) {
      const response = await supabase
        .from('plants')
        .update({ scientificName: updateInfo.scientificName })
        .eq('id', plantID)

      if (response.status !== 204) {
        updateStatus = false;
      }
    }

    if (updateInfo.drinkingDay !== drinkingDay) {
      const response = await supabase
        .from('plants')
        .update({ drinkingDay: updateInfo.drinkingDay })
        .eq('id', plantID)

      if (response.status !== 204) {
        updateStatus = false;
      }
    }

    if (updateInfo.wateringDate !== wateringDate) {
      const response = await supabase
        .from('plants')
        .update({ wateringDate: updateInfo.wateringDate })
        .eq('id', plantID)

      if (response.status !== 204) {
        updateStatus = false;
      }
    }

    if (updateInfo.drinkingPortion !== drinkingPortion) {
      const response = await supabase
        .from('plants')
        .update({ drinkingPortion: updateInfo.drinkingPortion })
        .eq('id', plantID)
      if (response.status !== 204) {
        updateStatus = false;
      }
    }

    if (updateStatus) {
      setUpdateNoti({
        open: true,
        message: 'Update plant info successfully.',
        severity: 'success'
      });
    } else {
      setUpdateNoti({
        open: true,
        message: 'Failed to update plant info.',
        severity: 'error'
      });
    }

    reloadEditedInfoValue()
  }

  const handleImageUpload = async (event) => {
    const uploadImage = event.target.files[0];
    const fileExt = uploadImage.name.split(".").pop();
    const filePath = `${plantID}.${fileExt}`

    const deleteResponse = await supabase
      .storage
      .from('plantimage')
      .remove([plantImage])

    if (deleteResponse.error) {
      setUpdateNoti({
        open: true,
        message: 'Error during updating progress' + deleteResponse.error,
        severity: 'error'
      })
    }

    localStorage.removeItem(plantImage)

    const uploadResponse = await supabase
      .storage
      .from('plantimage')
      .upload(filePath, uploadImage, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadResponse.error) {
      setUpdateNoti({
        open: true,
        message: 'Error during updating progress' + uploadResponse.error,
        severity: 'error'
      })
    }

    const updateResponse = await supabase
      .from('plants')
      .update({ image: filePath })
      .eq('id', plantID)

    if (updateResponse.status === 204) {
      const imageUrl = await utilSupaGetImage(plantImage);
      localStorage.setItem(plantImage, imageUrl);
      setPlantImageURL(imageUrl);
      updatePlantCardImageURL(imageUrl);

      setUpdateNoti({
        open: true,
        message: 'Update plant image successfully.',
        severity: 'success'
      });
    } else {
      setUpdateNoti({
        open: true,
        message: 'Failed to update plant image.',
        severity: 'error'
      });
    }
  }

  return (
    <>
      <Fade in={open}>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle variant='h4' alignSelf='center' >{name}</DialogTitle>
          <Box
            component="img"
            sx={{
              height: { sm: 300, md: 600 },
              width: { sm: 300, md: 600 },
              justifyContent: 'center',
              alignSelf: 'center',
              objectFit: 'contain',
            }}
            loading='lazy'
            src={plantImageURL}
          />
          <Button
            component="label"
            variant="contained"
            size='small'
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{
              width: 'fit-content',
              alignSelf: 'center',
              marginTop: 2,
            }}
          >
            Upload image
            <VisuallyHiddenInput
              type="file"
              onChange={handleImageUpload}
            />
          </Button>
          <Divider sx={{ width: '100%', marginTop: 2 }}>
            Plant ID: {plantID}
          </Divider>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              overflow: 'auto',
            }}
          >
            <TextField
              disabled={!editMode}
              label="Scientific Name"
              variant="outlined"
              name='scientificName'
              value={updateInfo.scientificName}
              onChange={handleUpdateInfo}
            />
            <TextField
              disabled={!editMode}
              label="Drinking Day (days)"
              variant="outlined"
              name='drinkingDay'
              value={updateInfo.drinkingDay}
              onChange={handleUpdateInfo}
            />
            <TextField
              disabled={!editMode}
              label="Drinking Portion (ml - mililiters)"
              variant="outlined"
              name='drinkingPortion'
              value={updateInfo.drinkingPortion}
              onChange={handleUpdateInfo}
            />
            <TextField
              disabled={!editMode}
              label="Last Watered"
              variant="outlined"
              name='wateringDate'
              value={updateInfo.wateringDate}
              onChange={handleUpdateInfo}
            />
          </DialogContent>
          <Alert
            sx={{ display: updateNoti.open ? 'flex' : 'none', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 2 }}
            severity={updateNoti.severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setUpdateNoti({
                    open: false,
                    message: 'There is no update',
                    severity: 'info'
                  });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {updateNoti.message}
          </Alert>
          <DialogActions>
            <Button onClick={() => { reloadEditedInfoValue(); setEditMode((prevMode) => !prevMode) }}>{editMode ? "Back" : "Edit"}</Button>
            <Button onClick={() => { submitUpdateInfo(); setEditMode((prevMode) => !prevMode) }} disabled={!editMode}>Submit</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Fade >
    </>
  );
}
