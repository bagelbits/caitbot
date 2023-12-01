import { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: 'Cait Bot',
}

export default async function Page() {
  return <ClientPage />
}
