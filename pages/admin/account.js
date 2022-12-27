import { Button, Card, Typography } from '@mui/material'
import Layout from '../../components/layout'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { API, getConfig } from '../../config/api';
import { useRouter } from 'next/router';
import ButtonIcon from '../../components/button-icon';
import ButtonLink from '../../components/button-link';
import { SwalConfirm, SwalFire, SwalLoading } from '../../utils/swal-fire'
import Head from 'next/head';

const Account = () => {
    const [accounts, setAccounts] = useState([])
    const router = useRouter()

    const getAccounts = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const accountsData = await API.get('/accounts', config)
            Swal.close()

            setAccounts(accountsData.data.data.accounts)
            // setIsLoading(false)
        } catch (error) {
            Swal.close()
            console.log(error);
            // SwalFire('error', error.response.data.message + '. Silahkan refresh halaman atau login kembali')
        }
    }

    const handleDeleteAccount = async (id) => {
        const deleteAccount = async () => {
            const Swal = SwalLoading()
            try {
                const config = await getConfig()
                await API.delete(`/accounts/${id}`, config)
                Swal.close()
                getAccounts()
            } catch (error) {
                Swal.close()
                SwalFire('error', error.response.data.message);
                // SwalFire('error', error.response.data.message)
            }
        }
        SwalConfirm(deleteAccount, 'Akun telah dihapus')
    }

    useEffect(() => {
        getAccounts()
    }, [])

    return (
        <Layout>
            <Head>
                <title>Master Account</title>
            </Head>
            <Card sx={{
                maxWidth: 900,
                margin: '0 auto',
                p: 5
            }} >
                <Typography variant="h5" color={'primary'}
                    sx={{ mb: 3 }}>
                    Master Account
                </Typography>
                <ButtonLink text={'Add Data'} href='/admin/account/add' icon='add' />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300, maxWidth: 800 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Name</TableCell>
                                <TableCell align="left">Username</TableCell>
                                <TableCell align="right">Phone Number</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accounts.map(account => (
                                <TableRow key={account.id}>
                                    <TableCell scope="row">{account.profile.name}</TableCell>
                                    <TableCell align="left">{account.username}</TableCell>
                                    <TableCell align="right">{account.profile.phone_number}</TableCell>
                                    <TableCell align="right">{account.role}</TableCell>
                                    <TableCell align="right">
                                        <ButtonIcon
                                            onClick={() => { router.push(`/admin/account/update/${account.id}`) }}
                                            Icon={EditIcon}
                                        />
                                        <ButtonIcon
                                            onClick={() => { handleDeleteAccount(account.id) }}
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

export default Account