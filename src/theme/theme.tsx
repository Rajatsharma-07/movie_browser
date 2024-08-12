import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


type Props = {
  children: React.ReactNode;
};
export default function ThemeProviders({ children }: Props) {

  const theme = createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            background: 'black',
            color: 'whitesmoke'
          }
        }
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: 'whitesmoke'
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'whitesmoke'
          }
        }
      },
      MuiDivider: {
        styleOverrides:{
          root: {
            background: 'whitesmoke'
          }
        }
      },
      MuiAccordion: {
        styleOverrides:{
          root:{
            background: 'inherit',
            border: '1px whitesmoke solid',
            color: 'whitesmoke'
          }
        }
      },
      // MuiButton: {
      //   styleOverrides: {
      //     root: {
      //       background: 'black',
      //       borderRadius: '8px',
      //       color: 'whitesmoke',
      //       textTransform: 'none',
      //       padding: '10px 30px',
      //       fontWeight: 'bold',
      //       '&:hover': {
      //         background: 'whitesmoke',
      //         color: 'black',
      //         fontWeight: 'bold',
      //       },
      //     }
      //   }
      // },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              color: 'whitesmoke', // Set the text color
              '& fieldset': {
                borderColor: 'whitesmoke', // Set the border color
              },
              '&:hover fieldset': {
                borderColor: 'whitesmoke', // Set the border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'whitesmoke', // Set the border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: 'whitesmoke', // Set the label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'whitesmoke', // Set the label color when focused
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'whitesmoke', // Set the border color
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'whitesmoke', // Set the border color on hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'whitesmoke', // Set the border color when focused
            },
            color: 'whitesmoke', // Set the text color,

          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            backgroundColor: '#333', // Set the background color of the options
            color: 'whitesmoke', // Set the text color of the options
            '&:hover': {
              backgroundColor: '#555', // Set the background color on hover
            },
            '&.Mui-selected': {
              backgroundColor: '#777', // Set the background color when selected
              color: 'white', // Set the text color when selected
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#555', // Set the background color on hover when selected
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: 'whitesmoke', // Set the label color
            '&.Mui-focused': {
              color: 'whitesmoke', // Set the label color when focused
            },
          },
        },
      },
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}