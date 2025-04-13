import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { supabase } from '../supabaseClient';


export default function NewPlantPage({ open, setOpen }) {
  const [formData, setFormData] = useState({
    name: '',
    otherName: '',
    drinkingDay: '7',
    wateringDate: '2025-04-30',
    drinkingPortion: '100',
  });

  const handleClose = () => {
    setFormData({
      name: '',
      otherName: '',
      drinkingDay: '',
      wateringDate: '',
      drinkingPortion: '',
    });
    setOpen(false)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {

    const response = await supabase
      .from('plants')
      .insert(formData)

    if (response.statusText !== "Created" || response.status !== 201) {
      alert("Cannot create new plant, there is something wrong.")
    }

    setFormData({
      name: '',
      otherName: '',
      drinkingDay: '7',
      wateringDate: '2025-04-30',
      drinkingPortion: '100',
    });

    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} closeAfterTransition={false}>
        <DialogTitle alignSelf='center' >Add New Plant</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Plant Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Other Name"
            name="otherName"
            fullWidth
            value={formData.otherName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Drinking Day (days)"
            name="drinkingDay"
            fullWidth
            value={formData.drinkingDay}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Drinking Portion (ml - mililiters)"
            name="drinkingPortion"
            fullWidth
            value={formData.drinkingPortion}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Last Watered"
            name="wateringDate"
            fullWidth
            value={formData.wateringDate}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleSubmit} color="primary">
            Save
          </Button>
          <Button variant='outlined' onClick={handleClose} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
