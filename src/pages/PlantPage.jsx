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
import Divider from '@mui/material/Divider';
import ImageIcon from '@mui/icons-material/Image';
import HideImageIcon from '@mui/icons-material/HideImage';
import Grow from '@mui/material/Grow';

import { supabase, utilSupaGetImage } from '../supabaseClient';
import CustomNoti from '../components/Notification'


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
  plantImageURL,
  setPlantImageURL
}) {

  const handleClose = () => {
    reloadEditedInfoValue();
    setEditMode(false);
    setOpen(false);
  };

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
  const [openImage, setOpenImage] = useState(true)

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

    setTimeout(() => {
      setUpdateNoti({
        open: false,
        message: 'There is no update',
        severity: 'info'
      })
    }, 3000)
  }

  const handleImageUpload = async (event) => {
    const uploadImage = event.target.files[0];
    const fileExt = uploadImage.name.split(".").pop();
    const filePath = `${plantID}.${fileExt}`

    if (plantImage !== 'noimage.png') {
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
    }

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
      const imageUrl = await utilSupaGetImage(filePath);
      setPlantImageURL(imageUrl);

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

    setTimeout(() => {
      setUpdateNoti({
        open: false,
        message: 'There is no update',
        severity: 'info'
      })
    }, 3000)
  }

  return (
    <>
      <Fade in={open}>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle variant='h4' alignSelf='center' >{name}</DialogTitle>
          <Grow in={openImage}
            {...(openImage ? { timeout: 1000 } : {})}
          >
            <Box
              component="label"
              sx={{
                display: openImage ? "flex" : "none",
                height: { sm: 300, md: 600 },
                width: { sm: 300, md: 600 },
              }}
            >
              <Box
                component="img"
                sx={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  objectFit: 'contain',
                }}
                loading='lazy'
                src={plantImageURL}
              />
              <VisuallyHiddenInput
                type="file"
                onChange={handleImageUpload}
              />
            </Box>
          </Grow>
          <Divider sx={{ width: '100%', marginTop: 2 }} >
            <Button variant="text" startIcon={openImage ? <HideImageIcon /> : <ImageIcon />} onClick={() => { setOpenImage((prevMode) => !prevMode) }}>
              {openImage ? "Hide image" : "Show image"}
            </Button>
          </Divider>
          <DialogContent
            sx={{
              width: { sm: 300, md: 600 },
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
          <CustomNoti notiInfo={updateNoti} setNotiInfo={setUpdateNoti} />
          <DialogActions>
            <Button variant='outlined' onClick={() => { reloadEditedInfoValue(); setEditMode((prevMode) => !prevMode) }}>{editMode ? "Back" : "Edit"}</Button>
            <Button variant='outlined' onClick={() => { submitUpdateInfo(); setEditMode((prevMode) => !prevMode) }} disabled={!editMode}>Submit</Button>
            <Button color='error' variant='outlined' onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Fade >
    </>
  );
}
