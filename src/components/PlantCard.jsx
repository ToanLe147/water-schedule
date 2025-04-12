import { useState, useEffect } from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
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

import { supabase, utilSupaGetImage } from '../supabaseClient';
import { PlantCardStyle, PlantCardImageStyle, PlantCardContentStyle } from '../styles';
import PlantPage from '../pages/PlantPage';

const WaterLevel = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#03A9F4',
  }
});

export default function PlantCard({
  plantID,
  name,
  plantImage,
  otherName,
  drinkingDay,
  wateringDate,
  drinkingPortion }) {

  const [openPlantPage, setOpenPlantPage] = useState(false);
  const [plantImageURL, setPlantImageURL] = useState(null);

  const findPlantInfo = async () => {
    const url = `https://www.google.com/search?q=${otherName}`;
    window.open(url, "_blank", "noreferrer");
  }

  const waterCurrentLevel = () => {
    const date1 = new Date(wateringDate);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return (drinkingDay - diffDays) / drinkingDay * 5;
  }

  const pourWater = async () => {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    const { data, error } = await supabase
      .from('plants')
      .update({ wateringDate: formattedDate })
      .eq('id', plantID)
      .select();
    if (error) {
      alert('Error updating watering date: ' + error.message);
    }
    if (data) {
      alert('Watering date updated to: ', formattedDate);
    }
  }

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await utilSupaGetImage(plantImage);
      setPlantImageURL(imageUrl);
    };

    fetchImage();

  }, [plantImage, plantImageURL]);

  return (
    <>
      <PlantPage
        open={openPlantPage}
        setOpen={setOpenPlantPage}
        plantID={plantID}
        name={name}
        plantImage={plantImage}
        otherName={otherName}
        drinkingDay={drinkingDay}
        wateringDate={wateringDate}
        drinkingPortion={drinkingPortion}
        plantImageURL={plantImageURL}
        setPlantImageURL={setPlantImageURL}
      />
      <Card
        sx={PlantCardStyle}
      >
        <CardActionArea
          onClick={() => setOpenPlantPage(true)}
          sx={PlantCardImageStyle}
        >
          <CardMedia
            component="img"
            src={plantImageURL}
            title={name}
            loading='lazy'
            sx={PlantCardImageStyle}
          />
        </CardActionArea>
        <CardContent
          sx={PlantCardContentStyle}
        >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Other Name: {otherName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Duration: {drinkingDay} days
          </Typography>
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
          <Button variant="outlined" size="small" startIcon={<LocalDrinkIcon />} onClick={pourWater}>Pour Water</Button>
          <Button variant="outlined" size="small" startIcon={<SearchIcon />} onClick={findPlantInfo}>Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
}
