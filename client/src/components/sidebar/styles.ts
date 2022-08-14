const styles = {
  container: {
    width: '350px',
    height: 'calc(100vh - 64px)',
    padding: '10px',
    borderRight: '2px solid rgb(43, 47, 60)',
  },
  activeNavHeader: {
    color: 'rgb(182, 146, 246)',
    display: 'flex',
  },
  inactiveNavHeader: {
    color: 'rgb(151, 161, 186)',
    display: 'flex',
  },
  navText: {
    marginLeft: '15px',
    width: '33%',
    flexShrink: 0,
    fontSize: 16,
    color: 'inherit',
  },
  navIcon: {
    fontSize: 20,
    color: 'inherit',
    marginTop: '2px',
  },
  activeIcon: {
    color: 'rgb(182, 146, 246)',
  },
  inactiveIcon: {
    color: 'rgb(151, 161, 186)',
  },
  activeNavSubHeader: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: '20px',
    textTransform: 'none',
    color: 'rgb(182, 146, 246)',
    background: 'rgb(30, 33, 42)',
    marginBottom: '5px',
  },
  navSubHeader: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: '20px',
    textTransform: 'none',
    color: 'rgb(151, 161, 186)',
    background: 'rgb(30, 33, 42)',
    marginBottom: '5px',
  },
  navDetails: {
    marginTop: '-10px',
  },
}

export default styles
