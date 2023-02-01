import { useProfile } from '@/lib/data/fetcher/profile'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import logoWhite from '../../public/images/logo-white.svg'
import { UserProfileMenu } from './menu/UserProfileMenu'
import { SignInButton } from './SignInButton'

const SiteHeader = () => {
  const { data: session } = useSession()
  const { profile } = useProfile()

  return (
    <div className="sticky flex items-center justify-between bg-white bg-opacity-5 backdrop-blur-xl drop-shadow-lg">
      <div className="w-20 h-20">
        <Link href="/">
          <Image
            src={logoWhite}
            alt={'Logo'}
            className="cursor-pointer hover:scale-105 hover:shadow-xl"
          />
        </Link>
      </div>
      <div>
        {session && <UserProfileMenu user={session.user} profile={profile} />}
        {!session && <SignInButton />}
      </div>
    </div>
  )
}

export default SiteHeader
