import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { API, getConfig } from '../../config/api'
import Layout from '../../components/layout'
import Head from 'next/head';
import { SwalLoading } from '../../utils/swal-fire'
import ButtonIcon from '../../components/button-icon';

const ProductDetail = ({ item, title }) => {
    const { id, name, price, image, description, stock } = item
    const [favElemen, setFavElemen] = useState(<></>)

    const handleAddFav = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const result = await API.post(`favorites`, { item_id: id }, config)
            Swal.close()
            getIsFavorite()
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }
    const handleDeleteFav = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const result = await API.delete(`favorites/${id}`, config)
            Swal.close()
            getIsFavorite()
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }

    const handleAddToCart = async () => {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const result = await API.post(`cart`, { item_id: id }, config)
            Swal.close()
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }

    async function getIsFavorite() {
        const Swal = SwalLoading()
        try {
            const config = await getConfig()
            const result = await API.get(`favorites/${id}/is-favorite`, config)
            Swal.close()

            const isFavorite = result.data.data.isFavorite

            if (isFavorite) {
                setFavElemen(
                    <IconButton onClick={handleDeleteFav}>
                        <FavoriteIcon fontSize='large' style={{ color: 'red', marginRight: 20 }} />
                    </IconButton>
                )
            } else {
                setFavElemen(
                    <IconButton onClick={handleAddFav}>
                        <FavoriteBorderIcon fontSize='large' style={{ color: 'red', marginRight: 20 }} />
                    </IconButton>
                )
            }
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }

    useEffect(() => {
        const isLogin = localStorage.getItem('login')
        if (isLogin) {
            getIsFavorite()
        }
    }, [])

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <Card sx={{ maxWidth: 800, margin: '0 auto' }}  >
                <CardContent>
                    <div style={{ textAlign: 'center' }} >
                        <Image
                            src={image}
                            alt={name}
                            width={350}
                            height={350}
                        />
                    </div>
                    <Typography variant="h4" component="div" color={'primary'}
                        sx={{ textAlign: 'center', mb: 4 }}
                    >
                        {name}
                    </Typography>
                    <div style={{ fontSize: 20 }} >
                        Price: <span style={{ color: '#f44336' }} >{price}</span>
                    </div>
                    <div style={{ fontSize: 20 }} >
                        Stock: <span style={{ color: '#f44336' }} >{stock}</span>
                    </div>
                    <Typography variant="body2" sx={{ fontSize: 18, my: 2 }}>
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {favElemen}
                    <IconButton onClick={handleAddToCart}>
                        <AddShoppingCartIcon fontSize='large' color='primary' />
                    </IconButton>
                </CardActions>
            </Card>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    let item;
    let title;

    try {
        const { id } = params
        const itemsData = await API.get(`/items/${id}`)
        item = itemsData.data.data.item
        title = item.name
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            item,
            title
        },
    };
}

export default ProductDetail