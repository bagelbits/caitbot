import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material'

const Header = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ py: 1.5, justifyContent: 'space-between' }}>
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
        <Link
          href="/admin"
          underline="none"
          sx={{
            color: 'secondary.light',
            fontSize: '0.875rem',
            px: '10px',
            py: '5px',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'secondary.main',
              color: 'background.default',
            },
          }}
        >
          Coach admin
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header
