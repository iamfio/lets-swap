import { signIn } from 'next-auth/react';

export const SignInButton = (): JSX.Element => {
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
