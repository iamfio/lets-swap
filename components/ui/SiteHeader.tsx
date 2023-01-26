import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import logoWhite from '../../public/images/logo-white.svg'

const UserProfileMenu = ({
  name,
  email,
  image,
}: {
  name?: string | null
  email?: string | null
  image?: string | null
}): JSX.Element => {
  return (
    <div className="flex items-center gap-3 mr-3">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="">
          <Image
            src={image!}
            alt={'User'}
            width={60}
            height={60}
            className="rounded-full border-2 border-spacing-4 border-inherit drop-shadow-md cursor-pointer"
          />
        </label>
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
          <li>
            <h4 className="">
              <span className="">{name}</span>
            </h4>
          </li>
          <li className="dividor"></li>
          <li>
            <Link href={'profile'}>My Profile</Link>
          </li>
          <li>
            <button type="button" onClick={() => signOut()}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

const SignInButton = (): JSX.Element => {
  return (
    <div className="flex items-center gap-3 mr-3">
      <button type="button" onClick={() => signIn()}>
        <span className="text-xl p-3 text-blue-900 dark:text-blue-300 border rounded-lg border-blue-900 dark:border-blue-300 hover:bg-blue-400 hover:text-blue-50 transition-all duration-100">
          Let's Start!
        </span>
      </button>
    </div>
  )
}

const SiteHeader = (): JSX.Element => {
  const { data: session } = useSession()

  return (
    <div className="flex justify-between items-center bg-white bg-opacity-5 backdrop-blur-xl drop-shadow-lg">
      <div className="w-24 h-24">
        <Image src={logoWhite} alt={'Logo'} />
      </div>
      <div>
        <h3>Let's Swap</h3>
      </div>
      <div>
        {session ? <UserProfileMenu {...session.user} /> : <SignInButton />}
      </div>
    </div>
  )
}

export default SiteHeader
