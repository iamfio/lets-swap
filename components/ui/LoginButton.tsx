import { useSession, signIn, signOut } from 'next-auth/react'
import { FC } from 'react'

const LoginButton: FC = (): JSX.Element => {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default LoginButton
