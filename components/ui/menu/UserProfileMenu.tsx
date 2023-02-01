import { Profile } from '@prisma/client'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

type UserProfileProps = {
  user: Session['user']
  profile?: Profile
}

export const UserProfileMenu: React.FC<UserProfileProps> = ({
  user,
  profile,
}): JSX.Element => {
  return (
    <div className="flex items-center gap-3 mr-3">
      <div>
        <Link href="">
          <span className="btn btn-outline btn-primary">New</span>
        </Link>
      </div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="">
          <Image
            src={user.image!}
            alt={'User'}
            width={70}
            height={70}
            className="border-2 rounded-full cursor-pointer border-spacing-4 border-inherit drop-shadow-md"
          />
        </label>
        <ul className="p-2 mt-2 shadow dropdown-content menu bg-base-100 rounded-box w-52">
          <li>
            <h4 className="">
              <span className="">{user.name}</span>
            </h4>
          </li>
          <li className="dividor"></li>
          <li>
            <Link href={`/u/${profile?.username}`}>My Profile</Link>
          </li>
          <li>
            <button type="button" onClick={() => signOut()}>
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
