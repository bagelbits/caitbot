import { Grid } from '@mui/material'
import Header from '../General/Header/Header'
import SequenceBuilder from './SequenceBuilder'

const SequenceGenerator = () => {
  return (
    <Grid container justifyContent="center">
      <Header />
      <SequenceBuilder.PageComponent />
    </Grid>
  )
}

export default SequenceGenerator
