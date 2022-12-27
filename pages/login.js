import { Button, Card, FormGroup, TextField } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { API } from '../config/api'
import { SwalFire, SwalLoading } from '../utils/swal-fire'
import { useDispatch, useSelector } from 'react-redux'
import { setName, setLogin } from '../redux/userSlice'

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [dataForm, setDataForm] = useState({
        username: '',
        password: '',
    })

    const handleChange = e => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const Swal = SwalLoading()
        try {
            const result = await API.post('/auth/login', dataForm)
            Swal.close()

            localStorage.setItem('login', true)
            localStorage.setItem('username', result.data.data.user.username)
            localStorage.setItem('name', result.data.data.user.name)
            localStorage.setItem('role', result.data.data.user.role)
            localStorage.setItem('token', result.data.data.token)

            const route = result.data.data.user.role === 'user' ? '/product' : '/admin/product'
            router.push(route)
        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message);
        }
    }

    useEffect(() => {
        localStorage.clear()
        dispatch(setLogin(false))
        dispatch(setName(''))
    }, [])

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <Card sx={{
                maxWidth: 500,
                margin: '0 auto',
                p: 5
            }} >
                <FormGroup sx={{ mb: 2 }}>
                    <TextField
                        id="username"
                        label="Username"
                        variant="standard"
                        name='username'
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="standard"
                        autoComplete="current-password"
                        name='password'
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button
                    variant='contained'
                    color='primary'
                    sx={{ mt: 4 }}
                    onClick={handleSubmit}
                >Login</Button>
            </Card>
        </Layout>
    )
}

export default Login