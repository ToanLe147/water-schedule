import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { supabase } from '../supabaseClient'

const DeletePlants = ({ open, setOpen, plantsList }) => {

  const handleDelete = async (id) => {
    const response = await supabase
      .from('plants')
      .delete()
      .eq('id', id)

    if (response.status !== 204) {
      alert("Cannot delete plant ID: " + id)
    }
  };



  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition={false}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle>Delete Plants</DialogTitle>
        <DialogContent>
          <List>
            {plantsList.map((plant) => (
              <ListItem
                key={plant.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDelete(plant.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{
                  width: "75%",
                }}
              >
                <ListItemText primary={plant.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='primary' onClick={() => setOpen(false)} >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePlants;