import { AppBar, Box, Toolbar, Typography } from '@mui/material'

const Header = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ py: 1.5 }}>
        <Box>
          <Typography
            sx={{
              fontFamily: '"Big Shoulders Display", sans-serif',
              fontWeight: 700,
              fontSize: '1.75rem',
              lineHeight: 1,
              color: 'background.default',
            }}
          >
            Caitbot
          </Typography>
          <Typography sx={{ color: 'secondary.light', fontSize: '0.875rem' }}>
            Practice sequence generator
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
