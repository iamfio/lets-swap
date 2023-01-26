import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import LoginButton from '@/components/ui/LoginButton'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Let's Swap!</title>
        <meta name="description" content="Things swap community" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl">Let's Swap!</h1>
        <p>
          It's a perfect place to exchange things you're not using right now.
          Right here.
        </p>
        <p>
          <LoginButton />
        </p>
      </main>
    </>
  )
}
