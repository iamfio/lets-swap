import CreateProfile from '@/components/profile/CreateProfile'
import { getUserProfile } from '@/lib/data/user'
import { Inter, Montserrat } from '@next/font/google'
import { Profile } from '@prisma/client'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

import type { Session } from 'next-auth'
const inter = Inter({ subsets: ['latin'], display: 'auto' })
const monsterrat = Montserrat({ subsets: ['latin'], display: 'auto' })

type IndexProps = {
  session: Session
  profile: Profile
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      props: {
        session: null,
      },
    }
  }

  const profile = await getUserProfile(session)

  return {
    props: {
      session,
      profile,
    },
  }
}

const Home: NextPage<IndexProps> = ({ session, profile }): JSX.Element => {
  return (
    <>
      <Head>
        <title>Let's Swap!</title>
        <meta name="description" content="Things swap community" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${monsterrat.className} flex flex-col items-center`}>
        <h1 className="m-6 text-3xl">Let's Swap!</h1>

        {!session && (
          <p className="">
            It's a perfect place to exchange things you're not using right now.
            Right here.
          </p>
        )}

        {!profile && session && (
          <div className="w-96">
            <div className="flex justify-center m-4">
              <p className="font-semibold">
                Before we begin, Create Your Profile
              </p>
            </div>
            <CreateProfile />
          </div>
        )}
      </div>
    </>
  )
}

export default Home
