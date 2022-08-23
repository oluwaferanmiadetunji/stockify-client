import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      grey: any
      primary: {
        main: string
      }
      secondary: {
        main: string
      }
    }
  }
  // allow configuration using `createTheme`
  // interface ThemeOptions {
  //   palette: {
  //     primary: {
  //       main: string
  //     }
  //     secondary: {
  //       main: string
  //     }
  //   }
  // }
}

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(105, 65, 198)',
    },
    secondary: {
      main: 'rgb(182, 146, 246)',
    },
  },
})

export default theme
