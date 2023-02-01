import { getUserProfile } from '@/lib/data/user'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

// TODO: Data validation
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })

    if (!session) {
      return res.status(401).json({ message: 'Invalid Session' })
    }

    const profile = await getUserProfile(session)

    return res.status(201).json(profile)
  } catch (error) {
    return res.status(400).json({
      message: 'Error creating profile',
    })
  }
}
