import LoginButton from '@/components/ui/LoginButton'
import { Inter, Montserrat } from '@next/font/google'
import { NextPage } from 'next'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'], display: 'auto' })
const monsterrat = Montserrat({ subsets: ['latin'], display: 'auto' })

const Home: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Let's Swap!</title>
        <meta name="description" content="Things swap community" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={inter.className}>
        <h1 className="text-3xl">Let's Swap!</h1>
        <p>
          It's a perfect place to exchange things you're not using right now.
          Right here.
        </p>
        <p>
          <LoginButton />
        </p>
      </div>
    </>
  )
}

export default Home
