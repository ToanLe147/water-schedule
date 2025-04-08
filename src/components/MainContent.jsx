import { useState, useEffect } from 'react'

import { Box, Paper, Fab } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import LogoutIcon from '@mui/icons-material/Logout';

import PlantCard from './PlantCard';
import { supabase } from '../supabaseClient'
import { AppContainerStyle, theme } from '../styles'


export default function MainContent() {
  // Fetch the plants data from Supabase
  // and subscribe to changes
  const [plants, setPlants] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [plantImage, setPlantImage] = useState(false);

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
        setPlantImage(false);
      } else {
        Array.from(data).map(async (plantInfo) => {
          if (!sessionStorage.getItem(plantInfo.image)) {
            const imageUrl = await getPlantImage(plantInfo.image);
            sessionStorage.setItem(plantInfo.image, imageUrl);
          }
        });
        setPlants(data);
        setPlantImage(true);
        setFetchError(null);
      }
    };

    fetchPlants();
  }, []);

  const getPlantImage = async (image_name) => {
    const size = window.innerWidth < 900 ? 300 : 600;
    const { data, _ } = await supabase
      .storage
      .from('plantimage')
      .createSignedUrl(image_name, 60 * 60, { // 1 hour
        transform: {
          width: size,
          height: size,
        }
      });
    if (data) {
      return (data.signedUrl)
    }
  }

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
        {plantImage && !fetchError &&(
          <Box sx={{
            height: '100dvh',
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'auto',
            justifyContent: 'center',
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
        <Fab color="secondary" aria-label="out" onClick={() => { sessionStorage.clear(); supabase.auth.signOut() }}
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            zIndex: 100,
            willChange: 'filter',
            transition: 'filter 300ms',
            ':hover': {
              filter: 'drop-shadow(0 0 0.75rem #fff)',
            },
          }}>
          <LogoutIcon />
        </Fab>
      </Box>

    </ThemeProvider>
  )
}