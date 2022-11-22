import { drawerWidth } from 'utils/constant'

const styles = {
  container: {
    background: 'rgb(17, 24, 39)',
    borderRight: '1px solid rgb(45, 55, 72)',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    boxSizing: 'border-box',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20px',
  },
  list: {
    margin: '10px 20px',
  },
  link: {
    minHeight: 32,
    color: 'rgba(255,255,255,.8)',
    padding: '10px 20px',
    borderRadius: '12px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.08)',
      color: 'white',
    },
    marginBottom: '5px',
  },
  activeLink: {
    minHeight: 32,
    color: 'rgb(16, 185, 129)',
    padding: '10px 20px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.08)',
    marginBottom: '5px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.08)',
      color: 'rgb(16, 185, 129)',
    },
  },
  icon: {
    fontSize: 2,
  },
  companyContainer: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgb(45, 55, 72)',
    margin: '20px',
    borderRadius: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  companyInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  company: {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  tier: {
    color: 'rgb(160, 174, 192)',
    fontSize: '14px',
  },
  menuList: {
    width: 350,
  },
}

export default styles
