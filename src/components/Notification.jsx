import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export default function CustomNoti({
  notiInfo,
  setNotiInfo
}) {

  return (
    <Alert
      sx={{ display: notiInfo.open ? 'flex' : 'none', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 2 }}
      severity={notiInfo.severity}
      action={
        <IconButton
          color="inherit"
          size="small"
          onClick={() => {
            setNotiInfo({
              open: false,
              message: 'Nothing to show',
              severity: 'info'
            });
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {notiInfo.message}
    </Alert>
  )
}