import { Grid } from '@mui/material'
import Header from '../General/Header/Header'
import SequenceBuilder from './SequenceBuilder'
import { useState } from 'react'
import Sequence from './Sequence'

const SequenceGenerator = () => {
  const [searchParams, setSearchParams] = useState({})
  console.log(searchParams)

  return (
    <Grid container justifyContent="center">
      <Header />
      <SequenceBuilder.PageComponent setSearchParams={setSearchParams} />
      {searchParams && <Sequence.PageComponent searchParams={searchParams} />}
    </Grid>
  )
}

export default SequenceGenerator
