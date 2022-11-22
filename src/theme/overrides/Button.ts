export default function Button(theme: {
  palette: { grey: any[]; action: { hover: any }; primary: any }
  customShadows: { z8: any; primary: any; secondary: any }
}) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
            color: '#344675',
          },
          textTransform: 'unset',
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: theme.palette.grey[800],

          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {},
        containedSecondary: {},
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
        },
      },
    },
  }
}
