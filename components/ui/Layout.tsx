import { Inter, Montserrat } from '@next/font/google'
import SiteHeader from './SiteHeader'

const inter = Inter({ subsets: ['latin'], display: 'auto' })
const monsterrat = Montserrat({ subsets: ['latin'], display: 'auto' })

type ChildrenProps = {
  children: string | JSX.Element | JSX.Element[] | '() => JSX.Element'
}

const Layout = ({ children }: ChildrenProps) => {
  return (
    <div className={`${monsterrat.className} h-screen`}>
      <SiteHeader />
      <div className="sm:p-4">
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
