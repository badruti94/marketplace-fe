import { Button, Card, IconButton, Typography } from '@mui/material'
import Layout from '../components/layout'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import { API, getConfig } from '../config/api';
import { SwalLoading } from '../utils/swal-fire'
import { useRouter } from 'next/router';
import ButtonIcon from '../components/button-icon';
import Head from 'next/head';


const CartPage = () => {
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)
    const router = useRouter()

    const getItems = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const result = await API.get('/cart', config)
            Swal.close()

            setItems(result.data.data.items)
            setTotal(result.data.data.total)
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }

    const handlePlusMinus = async (id, type) => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const result = await API.patch(`/cart/${type}`, { item_id: id }, config)
            Swal.close()
            getItems()
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }

    const handleCheckout = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const result = await API.post('/checkouts', {}, config)
            Swal.close()

            router.push(`/order/${result.data.data.orderId}`)
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }

    useEffect(() => {
        getItems()
    }, [])


    return (
        <Layout>
            <Head>
                <title>Cart</title>
            </Head>
            <Card sx={{
                maxWidth: 900,
                margin: '0 auto',
                p: 5
            }} >
                <Typography variant="h5" color={'primary'}
                    sx={{ mb: 3 }}>
                    Cart
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300, maxWidth: 800 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Name</TableCell>
                                <TableCell align="right">Count</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items && items.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell scope="row">{item.item.name}</TableCell>
                                    <TableCell align="right">{item.qty}</TableCell>
                                    <TableCell align="right">{item.item.price}</TableCell>
                                    <TableCell align="center">
                                        <ButtonIcon
                                            onClick={() => { handlePlusMinus(item.item_id, 'plus') }}
                                            Icon={AddIcon}
                                        />
                                        <ButtonIcon
                                            onClick={() => { handlePlusMinus(item.item_id, 'minus') }}
                                            Icon={RemoveIcon}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ fontSize: 20, marginTop: 20 }} >
                    Total: <span style={{ color: '#f44336' }} >{total}</span>
                </div>
                <Button variant='contained' sx={{ mt: 10 }} onClick={handleCheckout} >
                    Check out
                </Button>
            </Card>
        </Layout>
    )
}

export default CartPage