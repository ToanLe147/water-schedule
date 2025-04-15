import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f48fb1',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  shape: {
    borderRadius: 12,
  },
})

export const authCardWidth = window.innerWidth < 600 ? '100%' : '400px'

export const AppContainerStyle = {
  height: "100dvh",
  width: "100dvw",
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'text.primary',
  backgroundColor: '#FFCDD2',
  backgroundImage: 'radial-gradient(circle, #FFCDD2 0%, #000 100%)',
}

export const MainPageFetchErrorStyle = {
  padding: 2,
  margin: 2,
  backgroundColor: 'transparent',
  borderRadius: 2,
}

export const MainPagePlantCardsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  overflow: 'auto',
  justifyContent: 'space-evenly',
  alignItems: 'center',
}

export const SpeadDialContainer = {
  transform: 'translateZ(0px)',
  flexGrow: 1,
  position: 'absolute',
  bottom: 20,
  right: 20,
  zIndex: 100,
}

export const PlantCardStyle = {
  height: { xs: 'auto', sm: 'auto' },
  width: { xs: '90%', sm: '80%', md: 'auto' },
  margin: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  willChange: 'filter',
  transition: 'filter 300ms',
  ':hover': {
    md: {
      filter: 'drop-shadow(0 0 0.85rem #880E4F)',
    }
  },
}

export const PlantCardImageStyle = {
  height: { xs: '100%', sm: '100%', md: 'auto' },
  borderRadius: "12px",
  objectFit: 'contain',
}

export const PlantCardContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'begin',
  gap: 1,
  // border: "1px solid green"
}

export const PlantPageImageContainerStyle = (openImage) => {
  return (
    {
      display: openImage ? "flex" : "none",
      justifyContent: 'center',
    }
  )
}

export const PlantPageImageStyle = {
  justifyContent: 'center',
  alignSelf: 'center',
  objectFit: 'contain',
  borderRadius: '12px',
}