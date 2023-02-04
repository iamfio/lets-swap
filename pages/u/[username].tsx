import EditProfile from '@/components/profile/EditProfile'
import { prisma } from '@/db/db'
import { Address, Profile } from '@prisma/client'
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const profile = await prisma.profile.findUnique({
    where: {
      username: params?.username as string,
    },
    include: {
      address: true,
    },
  })

  return {
    props: {
      profile,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const profiles = await prisma.profile.findMany()
  const paths = profiles.map((profile) => ({
    params: { username: profile.username },
  }))

  return {
    paths,
    fallback: true,
  }
}

type ProfilePageProps = {
  profile: Profile & { address: Address }
}

const ProfilePage: NextPage<ProfilePageProps> = ({ profile }) => {
  const [editProfile, setEditProfile] = useState<boolean>(false)
  const router = useRouter()
  const { data: session } = useSession()

  if (router.isFallback) {
    return (
      <div className="flex justify-center">
        You'll be right there, wait a second please....
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-center mt-2 mb-8">
        <h1 className="font-semibold mb-4">
          Hello, {session?.user.name} <span className="text-3xl">👋</span>
        </h1>
      </div>
      <div className="flex justify-around columns-2">
        <div className="flex flex-col">
          <p>
            {profile.address.street} {profile.address.houseNr}
          </p>
          <p>
            {profile.address.zip} {profile.address.city}
          </p>
          <p>{profile.address.country}</p>
          <p>{profile.phoneNr}</p>
          <p>{session?.user.email}</p>
          <div>
            <button onClick={() => setEditProfile(true)} className="btn">
              Edit Profile
            </button>
            {editProfile && (
              <>
                <EditProfile />
                <button onClick={() => setEditProfile(false)} className="btn">
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2>Products</h2>
          <div>
            <div>You have no items on your list.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
