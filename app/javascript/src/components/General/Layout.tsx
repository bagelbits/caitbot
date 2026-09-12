import { ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'
import theme from './theme'

interface ComponentProps {
  children?: ReactNode
}

const Layout = ({ children }: ComponentProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Layout
