import { Grid } from '@mui/material'
import Header from '../General/Header/Header'
import SequenceBuilder from './SequenceBuilder'
import { useState } from 'react'
import Sequence from './Sequence'

const SequenceGenerator = () => {
  const [searchParams, setSearchParams] = useState({})

  return (
    <Grid container justifyContent="center">
      <Header />
      <SequenceBuilder.PageComponent setSearchParams={setSearchParams} />
      <Grid item xs={12}></Grid>
      {!!Object.keys(searchParams).length && <Sequence.PageComponent searchParams={searchParams} />}
    </Grid>
  )
}

export default SequenceGenerator
