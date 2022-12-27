import { Button, Card, Typography } from '@mui/material'
import Layout from '../components/layout'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { API, getConfig } from '../config/api';
import ButtonLink from '../components/button-link';
import Head from 'next/head';
import { SwalLoading } from '../utils/swal-fire'

const Order = () => {
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        const Swal = SwalLoading()

        try {
            const config = await getConfig()
            const ordersData = await API.get('/checkouts', config)
            Swal.close()
            setOrders(ordersData.data.data.orders)
        } catch (error) {
            Swal.close()
            console.log(error)
        }
    }

    const getRole = () => {
        return localStorage.getItem('role')
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <Layout>
            <Head>
                <title>Order List</title>
            </Head>
            <Card sx={{
                maxWidth: 900,
                margin: '0 auto',
                p: 5
            }} >
                <Typography variant="h5" color={'primary'}
                    sx={{ mb: 3 }}>
                    List Order
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300, maxWidth: 800 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Tanggal</TableCell>
                                {getRole() === 'admin' && (<TableCell >Nama</TableCell>)}
                                <TableCell align="right">Total</TableCell>
                                <TableCell >Status</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map(order => (
                                <TableRow
                                    key={order.id}
                                >
                                    <TableCell scope="row">{order.date}</TableCell>
                                    {getRole() === 'admin' && (
                                        <TableCell align='left'>{order?.user.profile.name}</TableCell>
                                    )}
                                    <TableCell align="right">{order.total}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell align="center">
                                        <ButtonLink
                                            text={'Lihat'}
                                            href={`/order/${order.id}`}
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

export default Order