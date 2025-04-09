import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { supabase } from '../supabaseClient';

export default function NewPlantPage({ open, setOpen }) {
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    drinkingDay: '',
    wateringDate: '',
    drinkingPortion: '',
  });

  const handleClose = () => {
    setFormData({
      name: '',
      scientificName: '',
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
    console.log('Form Data:', formData);

    const { data, error } = await supabase
      .from('countries')
      .insert(formData)
      .select()

    setFormData({
      name: '',
      scientificName: '',
      drinkingDay: '',
      wateringDate: '',
      drinkingPortion: '',
    });
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Plant</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Plant Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Scientific Name"
            name="scientificName"
            fullWidth
            value={formData.scientificName}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Drinking Day (days)"
            name="drinkingDay"
            fullWidth
            value={formData.drinkingDay}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Drinking Portion (ml - mililiters)"
            name="drinkingPortion"
            fullWidth
            value={formData.drinkingPortion}
            onChange={handleChange}
          />
          <TextField
            autoFocus
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
