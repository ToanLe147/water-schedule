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
    setOpen(false);
  };

  const [editMode, setEditMode] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlantImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleScientificNameChange = async (event) => {
    const response = await supabase
      .from('plants')
      .update({ scientificName: event.target.value })
      .eq('id', plantID)

    if (response.status !== 204 && event.target.value !== '') {
      alert('Error updating scientific name');
    }
  }

  const handleDrinkingDayChange = async (event) => {
    const response = await supabase
      .from('plants')
      .update({ drinkingDay: event.target.value })
      .eq('id', plantID)

    if (response.status !== 204 && event.target.value !== '') {
      alert('Error updating drinking day');
    }
  }

  const handleDrinkingPortionChange = async (event) => {
    const response = await supabase
      .from('plants')
      .update({ drinkingPortion: event.target.value })
      .eq('id', plantID)

    if (response.status !== 204 && event.target.value !== '') {
      alert('Error updating drinking portion');
    }
  }

  const handleLastWateredChange = async (event) => {
    const response = await supabase
      .from('plants')
      .update({ wateringDate: event.target.value })
      .eq('id', plantID)

    if (response.status !== 204 && event.target.value !== '') {
      alert('Error updating last watered date');
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
        // sx={{
        //   border: '2px solid #81C784',
        // }}
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
            Plant Info
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
              disabled
              label="ID"
              variant="standard"
              defaultValue={plantID}
            />
            <TextField
              disabled={!editMode}
              label="Scientific Name"
              variant="standard"
              defaultValue={scientificName}
              onChange={handleScientificNameChange}
            />
            <TextField
              disabled={!editMode}
              label="Drinking Day (days)"
              variant="standard"
              defaultValue={drinkingDay}
              onChange={handleDrinkingDayChange}
            />
            <TextField
              disabled={!editMode}
              label="Drinking Portion (ml - mililiters)"
              variant="standard"
              defaultValue={drinkingPortion}
              onChange={handleDrinkingPortionChange}
            />
            <TextField
              disabled={!editMode}
              label="Last Watered"
              variant="standard"
              defaultValue={wateringDate}
              onChange={handleLastWateredChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditMode((prevMode) => !prevMode)}>Edit</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Fade >
    </>
  );
}
