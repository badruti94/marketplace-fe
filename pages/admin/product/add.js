import { Button, Card, FormGroup, TextField } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../../components/layout'
import { SwalLoading } from '../../../utils/swal-fire'
import { API, getConfig } from '../../../config/api'

const AddProduct = () => {
    const router = useRouter()
    const [dataForm, setDataForm] = useState({
        name: '',
        description: '',
        stock: '',
        image: '',
        price: '',
    })

    const handleChange = e => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const Swal = SwalLoading()
        try {
            const config = await getConfig()

            const formData = new FormData()
            formData.set('name', dataForm.name)
            formData.set('description', dataForm.description)
            formData.set('stock', dataForm.stock)
            formData.set('price', dataForm.price)
            if (dataForm.image !== "" && dataForm.image !== null) {
                formData.set("image", dataForm.image[0], dataForm.image[0].name);
            }
            const result = await API.post('/items', formData, config)
            Swal.close()
            router.push('/admin/product')
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }

    return (
        <Layout>
            <Head>
                <title>Add Product</title>
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
                        id="description"
                        label="Description"
                        variant="standard"
                        name='description'
                        multiline
                        maxRows={4}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                    <TextField
                        id="stock"
                        label="Stock"
                        variant="standard"
                        name='stock'
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                    <TextField
                        id="price"
                        label="Price"
                        variant="standard"
                        name='price'
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup sx={{ mb: 2 }}>
                    <TextField
                        id="image"
                        label="Image"
                        variant="standard"
                        name='image'
                        type='file'
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

export default AddProduct