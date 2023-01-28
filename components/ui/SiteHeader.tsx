import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import logoWhite from '../../public/images/logo-white.svg'

type UserProfileProps = {
  name?: string | null
  email?: string | null
  image?: string | null
}

const UserProfileMenu: FC<UserProfileProps> = ({
  name,
  email,
  image,
}): JSX.Element => {
  return (
    <div className="flex items-center gap-3 mr-3">
      <div>
        <Link href=''>
          <span className='px-3 py-2 text-lg font-medium border rounded-lg text-primary hover:text-white hover:bg-primary border-primary'>New!</span>
        </Link>
      </div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="">
          <Image
            src={image!}
            alt={'User'}
            width={70}
            height={70}
            className="border-2 rounded-full cursor-pointer border-spacing-4 border-inherit drop-shadow-md"
          />
        </label>
        <ul className="p-2 mt-2 shadow dropdown-content menu bg-base-100 rounded-box w-52">
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
        <span className="p-3 text-xl transition-all duration-100 border rounded-lg text-primary hover:bg-primary hover:text-white border-primary">
          Let's Start!
        </span>
      </button>
    </div>
  )
}

const SiteHeader = (): JSX.Element => {
  const { data: session } = useSession()

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
        {/* <h3>Let's Swap</h3> */}
      </div>
      <div>
        {session ? <UserProfileMenu {...session.user} /> : <SignInButton />}
      </div>
    </div>
  )
}

export default SiteHeader
