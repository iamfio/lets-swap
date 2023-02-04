import { Address, Profile } from '@prisma/client'
import useSWR, { Fetcher } from 'swr'

let args: any[]
const fetcher = (...args: any) => fetch(args).then((res) => res.json())

// Functions to be used on client components

export const useProfile = () => {
  const { data, error, isLoading } = useSWR<
    Profile & { address: Address },
    Error
  >('/api/profile/get', fetcher)

  return {
    profile: data,
    isLoading,
    isError: error,
  }
}
