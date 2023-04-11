import { createTheme } from '@mui/material'
import { KnowitColors } from './styles'

// See: https://mui.com/material-ui/customization/palette/

const theme = createTheme({
  palette: {
    primary: {
      light: KnowitColors.greyGreen,
      main: KnowitColors.darkBrown,
      dark: KnowitColors.black,
    },
    secondary: {
      light: KnowitColors.lightGreen,
      main: KnowitColors.green,
      dark: KnowitColors.darkGreen,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          color: KnowitColors.darkGreen,
        },
        contained: {
          color: KnowitColors.darkBrown,
          backgroundColor: KnowitColors.lightGreen,
          '&:hover': {
            color: KnowitColors.white,
            backgroundColor: KnowitColors.darkGreen,
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '.modalContent': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '50vw',
            backgroundColor: KnowitColors.white,
            border: '2px solid #000',
            maxHeight: '80%',
            overflowY: 'auto',
            padding: '20px',
          },
        },
      },
    },
  },
})

export default theme
