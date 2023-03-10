import { prisma } from '@/db/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

// TODO: Data validation
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })

    const { username, phoneNr, street, houseNr, city, zip, country } = req.body

    if (!session) {
      return res.status(401).json({ message: 'Invalid Session' })
    }

    const profile = await prisma.profile.create({
      data: {
        username,
        phoneNr,
        address: {
          create: {
            street,
            houseNr,
            zip,
            city,
            country,
          },
        },
        user: { connect: { id: session.user?.id! } },
      },
    })

    return res.status(201).json(profile)
  } catch (error) {
    return res.status(400).json({
      message: 'Error creating profile',
    })
  }
}
