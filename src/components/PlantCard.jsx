import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PlantCard(planInfo) {
  console.log('PlantCard', planInfo);
  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title={planInfo.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {planInfo.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Scientific Name: {planInfo.scientificName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Drinking Day: {planInfo.drinkingDay}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Last Watered: {planInfo.wateringDate}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Drinking Portion: {planInfo.drinkingPortion}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Pour Water</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
