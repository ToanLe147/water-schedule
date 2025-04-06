import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import PlantCard from './PlantCard';
import { supabase } from '../supabaseClient'


export default function MainContent() {

  const [plants, setPlants] = React.useState(null);
  const [fetchError, setFetchError] = React.useState(null);

  React.useEffect(() => {
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
    <Box sx={{
      flexGrow: 1,
    }}>

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
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 1, md: 8, lg: 12 }}>
          {Array.from(plants).map((plantInfo, keyIndex) => (
            <Grid key={keyIndex} size={{ xs: 2, sm: 4, md: 4 }}>
              <PlantCard
              name={plantInfo.name}
              scientificName={plantInfo.scientificName}
              drinkingDay={plantInfo.drinkingDay}
              wateringDate={plantInfo.wateringDate}
              drinkingPortion={plantInfo.drinkingPortion}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}