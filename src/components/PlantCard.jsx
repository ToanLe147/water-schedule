import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PlantCard({
  name,
  scientificName,
  drinkingDay,
  wateringDate,
  drinkingPortion }) {


  const findPlantInfo = async () => {
    const response = await fetch(`https://trefle.io/api/v1/plants?token=${import.meta.env.VITE_APP_TREFLE_API_KEY}&q=${scientificName}&filter[scientific_name]=${scientificName}`);
    // const response = await fetch(`https://trefle.io/api/v1/plants?token=${import.meta.env.VITE_APP_TREFLE_API_KEY}&q=${scientificName}`);
    const json = await response.json();
    console.log(json);
  }

  return (
    <>
      <Card>
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Scientific Name: {scientificName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Drinking Day: {drinkingDay} days
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Last Watered: {wateringDate}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Drinking Portion: {drinkingPortion} ml
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Pour Water</Button>
          <Button size="small" onClick={findPlantInfo}>Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
}
