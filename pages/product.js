import { Grid } from '@mui/material'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Item from '../components/item'
import Layout from '../components/layout'
import { API } from '../config/api'
import { SwalLoading } from '../utils/swal-fire'

const Product = ({ items }) => {

    return (
        <Layout>
            <Head>
                <title>Katalog</title>
            </Head>
            <Grid container spacing={8}>
                {
                    items && items.map(item =>
                        <Item key={item.id} data={item} />
                    )
                }
            </Grid>
        </Layout>
    )
}

export async function getServerSideProps() {
    let items = []
    try {
        const itemsData = await API.get('/items')
        items = itemsData.data.data.items
    } catch (error) {
        console.log(error);
    }

    return {
        props: { items },
    };
}

export default Product