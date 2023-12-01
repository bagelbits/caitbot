'use client'

import Layout from '@/components/General/Layout'
import { Typography } from '@mui/material'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cait Bot',
}

const Page = () => {
  return (
    <Layout>
      <Typography>Hello world!</Typography>
    </Layout>
  )
}

export default Page
