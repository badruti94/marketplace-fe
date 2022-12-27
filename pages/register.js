import { Button, Card, FormGroup, TextField } from '@mui/material'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/layout'
import { API } from '../config/api'
import { SwalFire, SwalLoading } from '../utils/swal-fire'

const Register = () => {
    const [dataForm, setDataForm] = useState({
        name: '',
        username: '',
        password: '',
        phone_number: '',
        address: '',
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
            const result = await API.post('/auth/register', dataForm)
            Swal.close()
            SwalFire('success', 'Registered success. Please login on login page');

        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message);
        }
    }

    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>
            <Card sx={{
                maxWidth: 500,
                margin: '0 auto',
                p: 5
            }} >
                <FormGroup sx={{ mb: 2 }}>
                    <TextField
                        id="name"
                        label="Name"
                        variant="standard"
                        name='name'
                        onChange={handleChange}
                    />
                </FormGroup>
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
                <FormGroup sx={{ mb: 2 }}>
                    <TextField
                        id="phone_number"
                        label="Phone Number"
                        variant="standard"
                        name='phone_number'
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                    <TextField
                        id="address"
                        label="Address"
                        variant="standard"
                        multiline
                        maxRows={4}
                        name='address'
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button
                    variant='contained'
                    color='primary'
                    sx={{ mt: 4 }}
                    onClick={handleSubmit}
                >Register</Button>
            </Card>
        </Layout>
    )
}

export default Register