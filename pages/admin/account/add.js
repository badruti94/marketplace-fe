import { Button, Card, FormGroup, TextField } from '@mui/material'
import { useState } from 'react'
import { API, getConfig } from '../../../config/api'
import Layout from '../../../components/layout'
import { SwalLoading } from '../../../utils/swal-fire'
import { useRouter } from 'next/router'
import Head from 'next/head'

const AddAccount = () => {
    const router = useRouter()
    const [dataForm, setDataForm] = useState({
        name: '',
        username: '',
        password: '',
        role: 'user',
        phone_number: '',
        address: '',
    })

    const handleChange = e => {
        console.log(e.target.value);
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const Swal = SwalLoading()
            const config = await getConfig()
            console.log(dataForm);
            const result = await API.post('/accounts', dataForm, config)
            Swal.close()
            router.push('/admin/account')
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }

    return (
        <Layout>
            <Head>
                <title>Add Account</title>
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
                        name='password'
                        variant="standard"
                        autoComplete="current-password"
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
                        name='address'
                        multiline
                        maxRows={4}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button
                    variant='contained'
                    color='primary'
                    sx={{ mt: 4 }}
                    onClick={handleSubmit}
                >Submit</Button>
            </Card>
        </Layout>
    )
}

export default AddAccount