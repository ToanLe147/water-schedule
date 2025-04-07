import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import PlantCard from './PlantCard';
import { supabase } from '../supabaseClient'


export default function MainContent() {

  const [plants, setPlants] = React.useState([]);
  const [fetchError, setFetchError] = React.useState(null);

  React.useEffect(() => {
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
  }
  , []);

  return (
    <>
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
          height: '100dvh',
          display: 'flex',
          flexWrap: 'wrap',
          overflow: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          padding: 2,
        }}>
          {Array.from(plants).map((plantInfo) => (
              <PlantCard
                plantID={plantInfo.id}
                name={plantInfo.name}
                scientificName={plantInfo.scientificName}
                drinkingDay={plantInfo.drinkingDay}
                wateringDate={plantInfo.wateringDate}
                drinkingPortion={plantInfo.drinkingPortion}
              />
          ))}
        </Box>
      )}
    </>
  )
}