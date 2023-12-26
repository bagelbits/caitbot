interface ComponentParams {
  searchParams: {} | null
}

const PageComponent = ({ searchParams }: ComponentParams) => {
  return <></>
}

const ErrorState = () => {
  return <>Error</>
}

const LoadingState = () => {
  return <></>
}

const Sequence = {
  PageComponent,
}

export default Sequence
