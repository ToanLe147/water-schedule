import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import PlantCard from './PlantCard';


export default function MainContent() {
  return (
    <Box sx={{
       flexGrow: 1,
       }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 1, md: 8, lg: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <PlantCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
