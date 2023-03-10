import { prisma } from '@/db/db'
import { Session } from 'next-auth'

export const getUserProfile = async (session: Session) => {
  return await prisma.profile.findUnique({
    where: {
      userId: session.user.id!,
    },
  })
}

export const getUserProfileFull = async (session: Session) => {
  return await prisma.profile.findUnique({
    where: {
      userId: session.user.id!,
    },
    include: {
      address: true,
    },
  })
}
