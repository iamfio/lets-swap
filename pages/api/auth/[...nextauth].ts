import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import prisma from '@/lib/configs/prismadb'

const signInUser = async ({
  password,
  user,
}: {
  password: string
  user: any
}) => {
  if (!user.password) {
    throw new Error('Password is missing')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Wrong credentials')
  }

  return user
}

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // TODO: Add CredentialsProvider -> User Registration API Endpoint
    // CredentialsProvider({
    //   name: 'Credentials',
    //   type: 'credentials',
    //   credentials: {
    //     email: {
    //       label: 'E-Mail',
    //       type: 'email',
    //       placeholder: 'Your E-Mail',
    //     },
    //     password: {
    //       label: 'Password',
    //       type: 'password',
    //     },
    //   },
    //   async authorize(credentials, req) {
    //     const { email, password } = credentials as {
    //       email: string
    //       password: string
    //     }

    //     const user = await prisma.user.findUnique({ where: { email: email } })

    //     if (!user) {
    //       throw new Error('User not found')
    //     }

    //     return signInUser({ password, user })
    //   },
    // }),
  ],
  secret: process.env.JWT_SECRET,
})
