export const fetcher = async (url: string) => {
  return await fetch(url, {}).then((res) => res.json())
}

const convertToSearchParams = (params: Record<string, string | string[] | number | boolean>) => {
  const searchParams = new URLSearchParams()
  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (Array.isArray(value)) {
      value.forEach((value) => {
        searchParams.append(key, value)
      })
    } else {
      searchParams.append(key, params[key].toString())
    }
  })
  return searchParams
}

export const fetcherWithQueryString = async (
  url: string,
  queryStringParameters: Record<string, string | string[] | number | boolean>
) => {
  const params = convertToSearchParams(queryStringParameters)
  return await fetch(url + '?' + params).then((res) => res.json())
}
