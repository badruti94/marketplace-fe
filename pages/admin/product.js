import { Card, Typography } from '@mui/material'
import Layout from '../../components/layout'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonLink from '../../components/button-link';
import { useEffect, useState } from 'react';
import { API, getConfig } from '../../config/api';
import { useRouter } from 'next/router';
import ButtonIcon from '../../components/button-icon';
import { SwalConfirm, SwalLoading } from '../../utils/swal-fire'
import Head from 'next/head';

const Product = () => {
    const [items, setItems] = useState([])
    const router = useRouter()

    const getItems = async () => {
        const Swal = SwalLoading()
        try {
            const itemsData = await API.get('/items')
            Swal.close()

            setItems(itemsData.data.data.items)
            // setIsLoading(false)
        } catch (error) {
            Swal.close()
            console.log(error);
            // SwalFire('error', error.response.data.message + '. Silahkan refresh halaman atau login kembali')
        }
    }

    const handleDeleteItem = async (id) => {
        const deleteItem = async () => {
            const Swal = SwalLoading()
            try {
                const config = await getConfig()
                await API.delete(`/items/${id}`, config)
                Swal.close()
                getItems()
            } catch (error) {
                Swal.close()
                // SwalFire('error', error.response.data.message)
            }
        }
        SwalConfirm(deleteItem, 'Item telah dihapus')
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <Layout>
            <Head>
                <title>Master Product</title>
            </Head>
            <Card sx={{
                maxWidth: 900,
                margin: '0 auto',
                p: 5
            }} >
                <Typography variant="h5" color={'primary'}
                    sx={{ mb: 3 }}>
                    Master Item
                </Typography>
                <ButtonLink text={'Add Data'} href='/admin/product/add' icon='add' />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300, maxWidth: 800 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Stock</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell scope="row">{item.name}</TableCell>
                                    <TableCell align="right">{item.price}</TableCell>
                                    <TableCell align="right">{item.stock}</TableCell>
                                    <TableCell align="center">
                                        <ButtonIcon
                                            onClick={() => { router.push(`/product/${item.id}`) }}
                                            Icon={FindInPageIcon}
                                        />
                                        <ButtonIcon
                                            onClick={() => { router.push(`/admin/product/update/${item.id}`) }}
                                            Icon={EditIcon}
                                        />
                                        <ButtonIcon
                                            onClick={() => { handleDeleteItem(item.id) }}
                                            Icon={DeleteIcon}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Layout>
    )
}

export default Product