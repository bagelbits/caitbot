import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useSWR from 'swr'

import { ListTrickResult } from '../../types/api'
import { fetcher } from '../../utils/fetcher'

interface ComponentParams {
  trick: ListTrickResult
  position: number
}

/** The run-order numeral: this is the coach's actual routine order, not decoration. */
const Numeral = ({ position }: { position: number }) => (
  <Typography
    sx={{
      fontFamily: '"Big Shoulders Display", sans-serif',
      fontWeight: 700,
      fontSize: '1.75rem',
      color: 'warning.main',
      width: 40,
      flexShrink: 0,
    }}
  >
    {position}
  </Typography>
)

const PageComponent = ({ trick, position }: ComponentParams) => {
  const { data, error, isLoading } = useSWR('/api/tricks/' + trick.id, fetcher)

  if (error) {
    console.error(error)
    return <ErrorState />
  }
  if (isLoading) return <LoadingState trick={trick} position={position} />

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" alignItems="center">
          <Numeral position={position} />
          <Typography sx={{ fontWeight: 600 }}>{trick.name}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ pl: `${40 + 8}px` }}>
        <Typography color="text.secondary">{data.description}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

const ErrorState = () => {
  return <>Error</>
}

const LoadingState = ({ trick, position }: { trick?: ListTrickResult; position: number }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" alignItems="center">
          <Numeral position={position} />
          {trick ? <Typography sx={{ fontWeight: 600 }}>{trick.name}</Typography> : <Skeleton width="200px" />}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={20} />
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
