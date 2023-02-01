import { Profile } from '@prisma/client'
import useSWR, { Fetcher } from 'swr'

export const useProfile = () => {
  let args: any[]
  const fetcher = (...args: any) => fetch(args).then((res) => res.json())
  const { data, error, isLoading } = useSWR('/api/profile/get', fetcher)

  return {
    profile: data,
    isLoading,
    isError: error,
  }
}
