import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import PlantCard from './PlantCard';
import { supabase } from '../supabaseClient'


export default function MainContent() {

  const [plants, setPlants] = React.useState([]);

  React.useEffect(() => {
    // Fetch the plants data from Supabase
    const fetchPlants = async () => {
      const { data, error } = await supabase
        .from('plants')
        .select();

      if (error) {
        console.error('Error fetching plants:', error);
      } else {
        // console.log('Fetched plants:', data);
        setPlants(data);
      }
    };

    fetchPlants();
  }, []);

  return (
    <Box sx={{
       flexGrow: 1,
       }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 1, md: 8, lg: 12 }}>
        {Array.from(plants).map((plantInfo) => (
          <Grid key={plantInfo.id} size={{ xs: 2, sm: 4, md: 4 }}>
            <PlantCard plantInfo={plantInfo} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}