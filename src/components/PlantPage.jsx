import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fade from '@mui/material/Fade';


export default function PlantPage({open, setOpen, plantImage}) {

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
        >
          <DialogTitle>{"This is the page for more details about the plant with bigger view"}</DialogTitle>
          <Box
            component="img"
            sx={{
              height: 300,
              width: 300,
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src={plantImage}
          />
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Something vo va vo van cho dai ra ay ma
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleClose}>Also Close</Button>
          </DialogActions>
        </Dialog>
      </Fade>
    </>
  );
}
