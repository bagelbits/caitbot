import { AppBar, Box, Toolbar, Typography } from '@mui/material'

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <Typography sx={{ fontWeight: 600, color: 'wheat' }}>Sequence Generator</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
