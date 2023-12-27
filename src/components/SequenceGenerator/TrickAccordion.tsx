import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Skeleton,
  Typography,
} from '@mui/material'
import useSWR from 'swr'

import { ListTrickResult } from '@/types/api'
import { fetcher } from '@/utils/fetcher'

interface ComponentParams {
  trick: ListTrickResult
}

const PageComponent = ({ trick }: ComponentParams) => {
  const { data, error, isLoading } = useSWR('/api/tricks/' + trick.id, fetcher)

  if (error) {
    console.error(error)
    return <ErrorState />
  }
  if (isLoading) return <LoadingState trick={trick} />

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{trick.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{data.description}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

const ErrorState = () => {
  return <>Error</>
}

const LoadingState = ({ trick }: { trick?: ListTrickResult }) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{trick ? trick.name : <Skeleton width="200px" />}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

const Sequence = {
  PageComponent,
  LoadingState,
}

export default Sequence
