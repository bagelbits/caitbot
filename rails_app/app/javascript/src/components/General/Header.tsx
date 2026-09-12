import { AppBar, Toolbar, Typography } from '@mui/material'

const Header = () => {
  return (
    <AppBar position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography sx={{ fontWeight: 600, color: 'wheat' }}>Sequence Generator</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
