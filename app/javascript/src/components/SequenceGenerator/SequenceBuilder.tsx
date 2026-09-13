import { useState } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import useSWR from 'swr'
import ErrorIcon from '@mui/icons-material/Error'

import { fetcher } from '../../utils/fetcher'
import { ListApparatusResult, ListTrickTypeResult } from '../../types/api'

interface ComponentParams {
  setSearchParams: (searchParams: {}) => void
}

/** The "floor panel": a bordered surface, like a frame edge, holding the builder controls. */
const panelSx = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 3,
  p: 3,
}

const PageComponent = ({ setSearchParams }: ComponentParams) => {
  const {
    data: apparatuses,
    error: apparatusesError,
    isLoading: apparatusesIsLoading,
  } = useSWR('/api/apparatuses', fetcher)
  const {
    data: trickTypes,
    error: trickTypesError,
    isLoading: trickTypesIsLoading,
  } = useSWR('/api/trick_types', fetcher)
  const [selectedApparatus, setSelectedApparatus] = useState<ListApparatusResult | null>(null)
  const [sequence, setSequence] = useState<ListTrickTypeResult[]>([])
  const [inputError, setInputError] = useState(false)

  if (apparatusesError || trickTypesError) return <ErrorState />
  if (apparatusesIsLoading || trickTypesIsLoading) return <LoadingState />

  const onChange = (event: React.ChangeEvent<{}>, value: ListApparatusResult | null) => {
    setSelectedApparatus(value)
  }

  const addToSquence = (trickType: ListTrickTypeResult) => {
    setSequence([...sequence, trickType])
  }

  const handleDelete = (index: number) => {
    sequence.splice(index, 1)
    setSequence([...sequence])
  }

  return (
    <Box sx={panelSx}>
      <Autocomplete
        options={apparatuses as ListApparatusResult[]}
        getOptionLabel={(option) => option.name}
        onChange={onChange}
        renderOption={(props, option) => (
          <ListItem {...props} key={option.id}>
            {option.name}
          </ListItem>
        )}
        renderInput={(params) => <TextField {...params} label="Apparatus" required error={inputError} />}
      />

      <Stack direction="row" spacing={1} sx={{ mt: 3, flexWrap: 'wrap', rowGap: 1 }}>
        {trickTypes?.map((trickType: ListApparatusResult) => (
          <Button
            key={trickType.id}
            variant="outlined"
            color="secondary"
            onClick={() => {
              addToSquence(trickType)
            }}
          >
            Add {trickType.name}
          </Button>
        ))}
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', rowGap: 1, minHeight: 32 }}>
        {sequence.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No tricks added yet.
          </Typography>
        )}
        {sequence.map((trickType, index) => (
          <Chip key={index} label={trickType.name} variant="outlined" onDelete={() => handleDelete(index)} />
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => {
            setInputError(false)
            if (!selectedApparatus) {
              setInputError(true)
              return
            }
            const sequenceIds = sequence.map((trickType) => trickType.id)
            setSearchParams({ apparatus_id: selectedApparatus?.id, sequence_ids: sequenceIds.join(',') })
          }}
        >
          Generate
        </Button>
        <Button
          variant="text"
          color="inherit"
          onClick={() => {
            setSequence([])
          }}
        >
          Reset
        </Button>
      </Stack>
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
      <Typography color="error">Error loading generator data.</Typography>
    </Box>
  )
}

const LoadingState = () => {
  return (
    <Box sx={{ ...panelSx, display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  )
}

const SequenceBuilder = {
  PageComponent,
}

export default SequenceBuilder
