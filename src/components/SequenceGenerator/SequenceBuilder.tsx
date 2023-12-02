import { useState } from 'react'
import { Autocomplete, CircularProgress, Grid, TextField } from '@mui/material'
import useSWR from 'swr'

import { fetcher } from '@/utils/fetcher'
import { ListApparatusResult } from '@/types/api'

const PageComponent = () => {
  const { data, error, isLoading } = useSWR('/api/apparatuses', fetcher)
  const [selectedApparatus, setSelectedApparatus] = useState<ListApparatusResult | null>(null)

  if (error) return <ErrorState />
  if (isLoading) return <LoadingState />

  console.log(selectedApparatus)

  const onChange = (event: React.ChangeEvent<{}>, value: ListApparatusResult | null) => {
    setSelectedApparatus(value)
  }

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
      <Autocomplete
        color="secondary"
        options={data as ListApparatusResult[]}
        getOptionLabel={(option) => option.name}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} color="secondary" label="Apparatuses" />}
        sx={{ width: '90%' }}
      />
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
