import { prisma } from '@/db/db'
import { Address, Profile } from '@prisma/client'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

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

const ProfilePage = ({
  profile,
}: {
  profile: Profile & { address: Address }
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div className="flex justify-center">
        You'll be right there, wait a second please....
      </div>
    )
  }

  return (
    <div>
      <h1>{profile.username}</h1>

      <p>{profile.address?.street}</p>
    </div>
  )
}

export default ProfilePage
