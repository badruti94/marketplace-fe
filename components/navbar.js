import { Card } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setName, setLogin } from './../redux/userSlice'
import styles from './navbar.module.css'

const Navbar = () => {
    const router = useRouter()
    const [role, setRole] = useState('user')
    const userName = useSelector(state => state.user.name)
    const login = useSelector(state => state.user.login)
    const dispatch = useDispatch()

    const setStateRedux = () => {
        const name = localStorage.getItem('name') || ''
        const login = localStorage.getItem('login') || false
        dispatch(setName(name))
        dispatch(setLogin(login))
    }

    useEffect(() => {
        const roleLocalStorage = localStorage.getItem('role') || 'user'
        setRole(roleLocalStorage)

        const loginLocalStorage = localStorage.getItem('login')
        // setLogin(loginLocalStorage)

        setStateRedux()
    }, [])

    const navByRole = {
        user: <>
            <Link href={'/product'} className={styles.link} >Katalog</Link>
            <Link href={'/cart'} className={styles.link} >Cart</Link>
            <Link href={'/favorite'} className={styles.link} >Favorite</Link>
        </>,
        admin: <>
            <Link href={'/admin/product'} className={styles.link} >Master Product</Link>
            <Link href={'/admin/account'} className={styles.link} >Master Account</Link>
        </>
    }

    const getNavByLogin = () => {
        if (login) {
            return (<>
                <Link href={'/login'} className={styles.link} >Logout</Link>
                <Link href={'/profile'} className={styles.name} >{userName}</Link>
            </>)
        } else {
            return (<>
                <Link href={'/login'} className={styles.link} >Login</Link>
                <Link href={'/register'} className={styles.link} >Register</Link>
            </>)
        }
    }

    return (
        <Card sx={{ height: '10vh', textAlign: 'right', pt: 1, mb: 10 }} >
            <Link href={'/'} className={styles.link} >Home</Link>
            {
                navByRole[role]
            }
            <Link href={'/order'} className={styles.link} >Order</Link>
            {
                getNavByLogin()
            }
        </Card>
    )
}

export default Navbar