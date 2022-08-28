export default function Button(theme: {
  palette: { grey: any[]; action: { hover: any } }
  customShadows: { z8: any; primary: any; secondary: any }
}) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
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
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  }
}
