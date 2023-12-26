import { ReactNode, useState } from 'react'
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  ListItem,
  TextField,
} from '@mui/material'
import useSWR from 'swr'

import { fetcher } from '@/utils/fetcher'
import { ListApparatusResult, ListTrickTypeResult } from '@/types/api'

interface ComponentParams {
  setSearchParams: (searchParams: {}) => void
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
    <Grid
      container
      sx={{
        backgroundColor: 'primary.light',
        width: 'calc(50% - 128px)',
        p: '1rem',
        my: '2rem',
        borderRadius: '4px',
      }}
      justifyContent={'center'}
    >
      <Grid item xs={12}>
        <Autocomplete
          color="secondary"
          options={apparatuses as ListApparatusResult[]}
          defaultValue={apparatuses[0]}
          getOptionLabel={(option) => option.name}
          onChange={onChange}
          renderOption={(props, option, { selected }) => {
            return (
              <ListItem {...props} key={option.id}>
                {option.name}
              </ListItem>
            )
          }}
          renderInput={(params) => <TextField {...params} color="secondary" label="Apparatuses" />}
        />
      </Grid>
      <Grid item xs={12} sx={{ my: 2 }}>
        <Autocomplete
          clearIcon={false}
          options={[]}
          value={sequence}
          disabled
          freeSolo
          multiple
          renderTags={(value: ListTrickTypeResult[], props) =>
            value.map((option, index) => (
              <Chip
                key={index}
                label={option.name}
                onDelete={() => {
                  handleDelete(index)
                }}
              />
            ))
          }
          renderInput={(params) => <TextField label="Add Tags" {...params} />}
        />
      </Grid>
      {trickTypes && !!trickTypes.length && (
        <Grid item>
          {trickTypes?.map((trickType: ListApparatusResult) => (
            <Button
              key={trickType.id}
              variant="contained"
              onClick={() => {
                addToSquence(trickType)
              }}
              sx={{ mr: 2 }}
            >
              {trickType.name}
            </Button>
          ))}
        </Grid>
      )}
      <Grid item xs={12} sx={{ my: 2 }}>
        <Divider />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => {
            setSearchParams({ apparatus: selectedApparatus?.id, sequence })
          }}
        >
          Generate
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => {
            setSequence([])
          }}
          sx={{ ml: 2 }}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  )
}

const ErrorState = () => {
  return <>Error</>
}

const LoadingState = () => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: 'primary.light',
        width: 'calc(50% - 128px)',
        p: '1rem',
        my: '2rem',
      }}
      justifyContent={'center'}
    >
      <Grid item xs={1}>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

const SequenceBuilder = {
  PageComponent,
}

export default SequenceBuilder
