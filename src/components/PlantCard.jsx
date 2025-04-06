import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import SearchIcon from '@mui/icons-material/Search';


const WaterLevel = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#03A9F4',
  }
});


export default function PlantCard({
  name,
  scientificName,
  drinkingDay,
  wateringDate,
  drinkingPortion }) {

  const findPlantInfo = async () => {
    const url = `https://www.google.com/search?q=${scientificName}`;
    window.open(url, "_blank", "noreferrer");
  }

  const waterCurrentLevel = () => {
    const date1 = new Date(wateringDate);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays/drinkingDay*5;
  }

  return (
    <>
      <Card
        sx={{
          willChange: 'filter',
          transition: 'filter 300ms',
          ':hover, :active': {
            filter: 'drop-shadow(0 0 0.85rem #121212)',
          },
        }}
      >
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={name}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'begin', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Scientific Name: {scientificName}
          </Typography>
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Drinking Day: {drinkingDay} days
          </Typography> */}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Last Watered: {wateringDate}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Drinking Portion: {drinkingPortion} ml
          </Typography>
          <WaterLevel
            name="customized-color"
            defaultValue={0}
            size='large'
            max={5}
            readOnly
            precision={0.5}
            icon={<WaterDropIcon fontSize="inherit" />}
            emptyIcon={<WaterDropOutlinedIcon fontSize="inherit" />}
            value={waterCurrentLevel()}
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small" startIcon={<LocalDrinkIcon />}>Pour Water</Button>
          <Button variant="contained" size="small" startIcon={<SearchIcon />} onClick={findPlantInfo}>Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
}
