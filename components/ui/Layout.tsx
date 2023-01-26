import SiteHeader from './SiteHeader'

type ChildrenProps = {
  children: string | JSX.Element | JSX.Element[] | '() => JSX.Element'
}

const Layout = ({ children }: ChildrenProps) => {
  return (
    <div  className=' h-screen'>
      <SiteHeader />
      <div className="p-2">
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
