import Head from 'next/head'
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { API, getConfig } from '../config/api';
import { SwalLoading } from '../utils/swal-fire'
import { useDispatch } from 'react-redux'
import { setName } from './../redux/userSlice'


const Profile = () => {
    const dispatch = useDispatch()
    const [dataForm, setDataForm] = useState({
        name: '',
        phone_number: '',
        address: '',
    })

    const getProfile = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const result = await API.get('/profile', config)
            Swal.close()
            setDataForm(result.data.data.profile)
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

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
            const config = await getConfig()
            const result = await API.put('/profile', dataForm, config)
            Swal.close()
            dispatch(setName(dataForm.name))
            localStorage.setItem('name', dataForm.name)
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }

    return (
        <Layout>
            <Head>
                <title>Profile</title>
            </Head>
            <Card sx={{
                maxWidth: 700,
                margin: '0 auto',
                p: 5,
                justifyContent: 'center',
                justifyItems: 'center'
            }} >
                <Typography variant="h5" color={'primary'}
                    sx={{ mb: 3 }}>
                    Profile
                </Typography>

                <Box sx={{ maxWidth: 500, m: '0 auto' }} >
                    <TextField
                        id="name"
                        label="Name"
                        variant="standard"
                        sx={{ mb: 2, mr: 4 }}
                        name='name'
                        value={dataForm.name}
                        onChange={handleChange}
                    />
                    <TextField
                        id="phone_number"
                        label="Phone Number"
                        variant="standard"
                        sx={{ mb: 2, mr: 4 }}
                        name='phone_number'
                        value={dataForm.phone_number}
                        onChange={handleChange}
                    />
                    <TextField
                        id="address"
                        label="Address"
                        variant="standard"
                        multiline
                        name='address'
                        maxRows={4}
                        sx={{ mb: 2, mr: 4 }}
                        value={dataForm.address}
                        onChange={handleChange}
                    />
                    <Box></Box>
                    <Button
                        variant='contained'
                        color='primary'
                        sx={{ mt: 4 }}
                        onClick={handleSubmit}
                    >Update Profile</Button>
                </Box>
            </Card>
        </Layout>
    )
}

export default Profile