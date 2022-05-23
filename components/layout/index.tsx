import { NextPage } from 'next'
import Navbar from '@/components/NavBar'
import Footer from '@/components/Footer'

const Layout: NextPage = ({children}: {children: any}) => {
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  )
}
export default Layout