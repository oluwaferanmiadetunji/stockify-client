const styles = {
  container: {
    marginTop: '20px',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  back: {
    color: 'rgb(182, 146, 246)',
    textTransform: 'unset',
    fontSize: '16px',
    borderRadisu: '5px',
  },
  headerText: {
    color: 'white',
    fontSize: '22px',
    marginTop: '10px',
  },
  dot: {
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  status: {
    color: 'white',
    fontSize: '14px',
    marginTop: '10px',
  },
  content: {
    marginTop: '10px',
  },
  divider: {
    bgcolor: 'rgb(43, 47, 60)',
    marginBottom: '5px',
  },

  box: {
    marginBottom: '30px',
  },
  label: {
    marginBottom: '7px',
    color: 'white',
    fontSize: '14px',
  },
  value: {
    color: 'rgb(151, 161, 186)',
    fontSize: '16px',
  },
  textfield: {
    input: {
      color: 'white',
    },
    select: {
      color: 'white',
    },
    marginBottom: '20px',
    '& legend': { display: 'none' },
    '& fieldset': { top: 0 },
  },
  loaderContainer: {
    height: 400,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}

export default styles
