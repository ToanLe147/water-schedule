import { useState } from 'react'

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import YardIcon from '@mui/icons-material/Yard';
import LogoutIcon from '@mui/icons-material/Logout';

import { supabase } from '../supabaseClient';
import NewPlantPage from './NewPlantPage';


export default function UserSpeedDial() {

  const [openNewPlantPage, setOpenNewPlantPage] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    { icon: <LogoutIcon />, name: 'Logout', onClick: () => { localStorage.clear(); supabase.auth.signOut() } },
    { icon: <YardIcon />, name: 'Add New Plant', onClick: () => { setOpenNewPlantPage(true), handleClose() } },
  ];

  return (
    <>
      <NewPlantPage open={openNewPlantPage} setOpen={setOpenNewPlantPage} />
      <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, position: 'absolute', bottom: 20, right: 20, zIndex: 100, }}>
        <SpeedDial
          ariaLabel="Options"
          icon={<SpeedDialIcon />}
          sx={{
            willChange: 'filter',
            transition: 'filter 300ms',
            ':hover': {
              filter: 'drop-shadow(0 0 0.25rem #FFCDD2)',
            },
          }}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              onClick={action?.onClick}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}
