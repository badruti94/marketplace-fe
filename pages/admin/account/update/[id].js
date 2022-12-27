import { Button, Card, FormGroup, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { API, getConfig } from '../../../../config/api'
import Layout from '../../../../components/layout'
import { SwalFire, SwalLoading } from '../../../../utils/swal-fire'
import Head from 'next/head'
import { useRouter } from 'next/router'

const AddAccount = ({ id }) => {
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

        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            console.log(dataForm);
            const result = await API.put(`/accounts/${id}`, dataForm, config)
            Swal.close()
            router.push('/admin/account')
        } catch (error) {
            Swal.close()
            SwalFire('error', error.response.data.message);
            console.log(error);
        }
    }

    const getData = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const accountResponse = await API.get(`/accounts/${id}`, config)
            Swal.close()
            const { account: accountData } = accountResponse.data.data
            setDataForm({
                ...dataForm,
                name: accountData.profile.name,
                username: accountData.username,
                role: accountData.role,
                phone_number: accountData.profile.phone_number,
                address: accountData.profile.address,
            })
        } catch (error) {
            Swal.close()
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Layout>
            <Head>
                <title>Update Account</title>
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
                        value={dataForm.name}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                    <TextField
                        id="username"
                        label="Username"
                        variant="standard"
                        name='username'
                        value={dataForm.username}
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
                        value={dataForm.password}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                    <TextField
                        id="phone_number"
                        label="Phone Number"
                        variant="standard"
                        name='phone_number'
                        value={dataForm.phone_number}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                    <TextField
                        id="role"
                        select
                        label="Role"
                        name='role'
                        variant="standard"
                        value={dataForm.role}
                        onClick={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option key='user' value="user">user</option>
                        <option key='admin' value="admin">admin</option>
                    </TextField>
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                    <TextField
                        id="address"
                        label="Address"
                        variant="standard"
                        name='address'
                        multiline
                        maxRows={4}
                        value={dataForm.address}
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

export async function getServerSideProps({ params }) {
    const { id } = params

    return {
        props: {
            id
        },
    };
}

export default AddAccount