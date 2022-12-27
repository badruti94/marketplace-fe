import { Grid } from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Item from '../components/item'
import Layout from '../components/layout'
import { API, getConfig } from '../config/api'
import { SwalLoading } from '../utils/swal-fire'

const Favorite = () => {
    const [favorites, setFavorites] = useState([])

    const getFavorites = async () => {
        const Swal = SwalLoading()

        try {
            const config = await getConfig()
            const favoritesData = await API.get('/favorites', config)
            Swal.close()
            setFavorites(favoritesData.data.data.favorites)
            // setIsLoading(false)
        } catch (error) {
            Swal.close()
            console.log(error);
        }
    }

    useEffect(() => {
        getFavorites()
    }, [])

    return (
        <Layout>
            <Head>
                <title>Favorite</title>
            </Head>
            <Grid container spacing={8}>
                {
                    favorites && favorites.map(favorite =>
                        <Item key={favorite.item.id} data={favorite.item} />
                    )
                }
            </Grid>
        </Layout>
    )
}



export default Favorite