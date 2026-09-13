import { Box, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import useSWR from 'swr'

import { ListTrickResult } from '../../types/api'
import { fetcherWithQueryString } from '../../utils/fetcher'
import TrickAccordion from './TrickAccordion'

interface ComponentParams {
  searchParams: {}
}

const PageComponent = ({ searchParams }: ComponentParams) => {
  const { data, error, isLoading } = useSWR(['/api/generate_sequence', searchParams], ([url, params]) =>
    fetcherWithQueryString(url, params)
  )

  if (error) {
    console.error(error)
    return <ErrorState />
  }
  if (isLoading) return <LoadingState />

  const sequence: ListTrickResult[] = data?.sequence

  return (
    <Box sx={{ mt: 4 }}>
      {sequence?.map((trick: ListTrickResult, index) => (
        <TrickAccordion.PageComponent key={index} trick={trick} position={index + 1} />
      ))}
    </Box>
  )
}

const ErrorState = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        m: 3,
      }}
    >
      <ErrorIcon color="error" sx={{ mr: 1 }} />
      <Typography color="error">Error loading sequence.</Typography>
    </Box>
  )
}

const LoadingState = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <TrickAccordion.LoadingState position={1} />
      <TrickAccordion.LoadingState position={2} />
      <TrickAccordion.LoadingState position={3} />
    </Box>
  )
}

const Sequence = {
  PageComponent,
}

export default Sequence
