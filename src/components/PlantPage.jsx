import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';


export default function PlantPage({
  open,
  setOpen,
  plantID,
  name,
  plantImage,
  scientificName,
  drinkingDay,
  wateringDate,
  drinkingPortion
}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Fade in={open}>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            border: '2px solid #81C784',
          }}
        >
          <DialogTitle variant='h4' alignSelf='center' >{"Details View"}</DialogTitle>
          <Box
            component="img"
            sx={{
              height: { sm: 300, md: 600 },
              width: { sm: 300, md: 600 },
              justifyContent: 'center',
              alignSelf: 'center',
              objectFit: 'contain',
            }}
            src={sessionStorage.getItem(plantImage)}
          />
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'begin',
              justifyContent: 'space-between',
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <DialogContentText id="alert-dialog-slide-description">
              {"ID: " + plantID}
            </DialogContentText>
            <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              Scientific Name: {scientificName}
            </Typography>
            <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              Drinking Day: {drinkingDay} days
            </Typography>
            <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              Last Watered: {wateringDate}
            </Typography>
            <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              Drinking Portion: {drinkingPortion} ml
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleClose}>Also Close</Button>
          </DialogActions>
        </Dialog>
      </Fade >
    </>
  );
}
