import { useState } from 'react'
import { NextPage } from 'next'
import styles from './index.module.scss'
import Link from 'next/link'
import { navs } from './nav'
import { useRouter } from 'next/router'
import { Button } from 'antd'
import Login from '@/components/Login'

const NavBar: NextPage = () => {
    const [ isShowLogin, setIsShowLogin ] = useState(false)
    const router = useRouter()
    const handleGotoEditorPage = () => {
        console.log(1)
    }
    const handleLogin = () => {
        setIsShowLogin(true)
    }
    const handleClose = () => {
        setIsShowLogin(false)
    }
    return (
        <div className={styles.navBar}>
            <section className={styles.loginArea}>BLOG-C</section>
            <section className={styles.linkArea}>
                {
                    navs?.map((nav: any) =>(
                        <Link key={nav.value} href={nav.value}>
                            <a className={router.asPath === nav?.value ? styles.active:''}>{nav?.label}</a>
                        </Link>
                    ))
                }
            </section>
            <section className={styles.operationArea}>
                <Button onClick={handleGotoEditorPage}>写文章</Button>
                <Button type="primary" onClick={handleLogin}>登录</Button>
            </section>
            <Login isShow={isShowLogin} onClose={handleClose}></Login>
        </div>
    )
}
export default NavBar