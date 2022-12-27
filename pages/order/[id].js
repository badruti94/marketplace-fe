import { Box, Button, Card, TextField, Typography } from '@mui/material'
import Layout from '../../components/layout'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { API, getConfig } from '../../config/api';
import Link from 'next/link';
import Head from 'next/head';
import { SwalLoading } from '../../utils/swal-fire'

const OrderDetail = ({ id }) => {
    const [order, setOrder] = useState({
        id: null,
        transfer_proof: null,
        total: null,
        status: null,
    })
    const [items, setItems] = useState([])
    const [file, setFile] = useState('')
    const [role, setRole] = useState('user')

    const getOrderDetail = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const orderDetailData = await API.get(`/checkouts/${id}`, config)
            Swal.close()
            setOrder(orderDetailData.data.data.orderData)
            setItems(orderDetailData.data.data.orderItem)

        } catch (error) {
            Swal.close()
            console.log(error)
        }
    }

    const handlePay = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()

            const formData = new FormData()
            formData.set('transfer_proof', file[0], file[0].name)
            const result = await API.post(`/checkouts/${id}/pay`, formData, config)
            Swal.close()
            getOrderDetail()
            console.log(result.data);
        } catch (error) {
            Swal.close()
            console.log(error)
        }
    }

    const handleSend = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const result = await API.patch(`/checkouts/${id}/send`, {}, config)
            Swal.close()
            getOrderDetail()
            console.log(result.data);
        } catch (error) {
            Swal.close()
            console.log(error)
        }
    }

    const handleReceive = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const result = await API.patch(`/checkouts/${id}/receive`, {}, config)
            Swal.close()
            getOrderDetail()
            console.log(result.data);
        } catch (error) {
            Swal.close()
            console.log(error)
        }
    }

    const getRole = () => {
        return localStorage.getItem('role')
    }

    const getStatusText = () => {
        switch (order.status) {
            case 'Belum Dibayar':
                return 'Menunggu Pembayaran'
            case 'Sudah Dibayar':
                return 'Menunggu Pengiriman'
            default:
                return order.status
        }
    }

    const getDisplayButton = () => {
        if (role === 'user' && (order.status === 'Sudah Dibayar' || order.status === 'Diterima')) {
            return 'none'
        } else if (role === 'admin') {
            if (order.status === 'Sudah Dibayar') {
                return ''
            } else {
                return 'none'
            }
        }

        return ''
    }

    const handleSubmit = () => {
        switch (order.status) {
            case 'Belum Dibayar':
                handlePay()
                break;
            case 'Sudah Dibayar':
                handleSend()
                break;
            case 'Dikirim':
                handleReceive()
                break;

            default:
                break;
        }
    }

    const getButtonText = () => {
        switch (order.status) {
            case 'Belum Dibayar':
                return 'Bayar'
            case 'Sudah Dibayar':
                return 'Kirim'
            case 'Dikirim':
                return 'Terima'
            default:
                break;
        }
    }

    useEffect(() => {
        getOrderDetail()
        setRole(getRole())
    }, [])

    return (
        <Layout>
            <Head>
                <title>Detail Order</title>
            </Head>
            <Card sx={{
                maxWidth: 900,
                margin: '0 auto',
                p: 5
            }} >
                <Typography variant="h5" color={'primary'}
                    sx={{ mb: 3 }}>
                    Items
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300, maxWidth: 800 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Name</TableCell>
                                <TableCell align="right">Count</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items && items.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell scope="row">{item.item.name}</TableCell>
                                    <TableCell align="right">{item.qty}</TableCell>
                                    <TableCell align="right">{item.item.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ fontSize: 20, marginTop: 20 }} >
                    Total: <span style={{ color: '#f44336' }} >{order.total}</span>
                </div>
            </Card>

            <Card sx={{
                maxWidth: 900,
                margin: '0 auto',
                mt: 10,
                p: 5,
                textAlign: 'center'
            }} >
                <Typography variant="h5" color={'primary'}
                    sx={{ mb: 10 }}>
                    {getStatusText()}
                </Typography>
                {
                    (order.status === 'Belum Dibayar' && role === 'user') && (
                        <Box >
                            <Typography variant="body2">
                                Silahkan kirim bukti transfer pada form di bawah ini
                            </Typography>
                            <TextField
                                id="transfer_proof"
                                label="Bukti Transfer"
                                variant="standard"
                                type={'file'}
                                sx={{ mb: 2, mr: 4 }}
                                onChange={(e) => {
                                    setFile(e.target.files)
                                }}
                            />
                        </Box>
                    )
                }
                {
                    (order.status !== 'Belum Dibayar' && role === 'admin') && (
                        <Link href={order.transfer_proof || ''} target='_blank'>
                            Lihat Bukti Transfer
                        </Link>
                    )
                }


                <Button variant='contained'
                    sx={{ mt: 10, display: getDisplayButton() }}
                    onClick={handleSubmit}
                >
                    {getButtonText()}
                </Button>
            </Card>
        </Layout >
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

export default OrderDetail