import { Box } from '@mui/material'
import Header from '../General/Header'
import SequenceBuilder from './SequenceBuilder'
import { useState } from 'react'
import Sequence from './Sequence'

const SequenceGenerator = () => {
  const [searchParams, setSearchParams] = useState({})

  return (
    <Box>
      <Header />
      <Box sx={{ maxWidth: 640, mx: 'auto', px: 2, py: 4 }}>
        <SequenceBuilder.PageComponent setSearchParams={setSearchParams} />
        {!!Object.keys(searchParams).length && <Sequence.PageComponent searchParams={searchParams} />}
      </Box>
    </Box>
  )
}

export default SequenceGenerator
