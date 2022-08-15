import { styled } from '@mui/material/styles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const styles = {
  container: {
    marginTop: '40px',
  },
  headerText: {
    color: 'white',
  },
  tabsContainer: {
    borderBottom: 1,
    borderColor: 'divider',
    marginTop: '20px',
    marginBottom: '20px',
  },
}

export default styles

interface StyledTabsProps {
  children?: React.ReactNode
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    textColor="secondary"
    indicatorColor="secondary"
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: 'rgb(182, 146, 246)',
  },
})

interface StyledTabProps {
  label: string
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: 'rgb(182, 146, 246)',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}))