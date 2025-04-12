import { useState, useEffect } from 'react'

import { Box, Paper, Fab } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import LogoutIcon from '@mui/icons-material/Logout';

import PlantCard from '../components/PlantCard';
import { supabase } from '../supabaseClient'
import { AppContainerStyle, theme } from '../styles'
import UserSpeedDial from '../components/SpeedDial';


export default function MainContent() {
  // Fetch the plants data from Supabase
  // and subscribe to changes
  const [plants, setPlants] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    // Subscribe to changes in the plants table
    supabase
      .channel('plants')
      .on('postgres_changes', { event: '*', schema: '*' }, payload => {
        if (payload.eventType === 'INSERT') {
          setPlants((prevPlants) => [...prevPlants, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setPlants((prevPlants) =>
            prevPlants.map((plant) =>
              plant.id === payload.new.id ? payload.new : plant
            )
          );
        } else if (payload.eventType === 'DELETE') {
          setPlants((prevPlants) =>
            prevPlants.filter((plant) => plant.id !== payload.old.id)
          );
        }
      })
      .subscribe()

    // Fetch the plants data from Supabase
    const fetchPlants = async () => {
      const { data, error } = await supabase
        .from('plants')
        .select();

      if (error) {
        setFetchError(error);
        setPlants(null);
      } else {
        setPlants(data);
        setFetchError(null);
      }
    };

    fetchPlants();
  }, []);

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />

      <Box sx={AppContainerStyle}>
        {fetchError && (
          <Paper
            elevation={0}
            sx={{
              padding: 2,
              margin: 2,
              backgroundColor: 'transparent',
              borderRadius: 2,
            }}
          >
            <h1>Error fetching plants</h1>
            <p>{fetchError}</p>
          </Paper>
        )}
        {plants && !fetchError && (
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'auto',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gap: 2,
            padding: 2,
          }}>
            {Array.from(plants).map((plantInfo, keyIndex) => (
              <PlantCard
                key={keyIndex}
                plantID={plantInfo.id}
                name={plantInfo.name}
                plantImage={plantInfo.image}
                scientificName={plantInfo.scientificName}
                drinkingDay={plantInfo.drinkingDay}
                wateringDate={plantInfo.wateringDate}
                drinkingPortion={plantInfo.drinkingPortion}
              />
            ))}
          </Box>
        )}
        <UserSpeedDial plantsList={plants} />
      </Box>

    </ThemeProvider>
  )
}