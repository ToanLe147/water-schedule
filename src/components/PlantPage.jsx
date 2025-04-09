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

import { supabase } from '../supabaseClient';


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
  plantImageURL,
  scientificName,
  drinkingDay,
  wateringDate,
  drinkingPortion
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
              onChange={(event) => console.log(event.target.files)}
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
              // border: '1px solid #81C784',
            }}
          >
            <TextField
              disabled={!editMode}
              label="Scientific Name"
              variant="outlined"
              name='scientificName'
              // defaultValue={scientificName}
              value={updateInfo.scientificName}
              onChange={handleUpdateInfo}
            />
            <TextField
              disabled={!editMode}
              label="Drinking Day (days)"
              variant="outlined"
              name='drinkingDay'
              // defaultValue={drinkingDay}
              value={updateInfo.drinkingDay}
              onChange={handleUpdateInfo}
            />
            <TextField
              disabled={!editMode}
              label="Drinking Portion (ml - mililiters)"
              variant="outlined"
              name='drinkingPortion'
              // defaultValue={drinkingPortion}
              value={updateInfo.drinkingPortion}
              onChange={handleUpdateInfo}
            />
            <TextField
              disabled={!editMode}
              label="Last Watered"
              variant="outlined"
              name='wateringDate'
              // defaultValue={wateringDate}
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
            <Button onClick={() => {reloadEditedInfoValue; setEditMode((prevMode) => !prevMode)}}>{editMode ? "Back" : "Edit"}</Button>
            <Button onClick={() => {submitUpdateInfo; setEditMode((prevMode) => !prevMode)}} disabled={!editMode}>Submit</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Fade >
    </>
  );
}
