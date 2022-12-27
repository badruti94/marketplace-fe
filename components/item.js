import { Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import ButtonLink from './button-link'

const Item = ({ data }) => {
    const { id, name, price, image } = data

    return (
        <Grid item xs={4} md={3}>
            <Card sx={{ textAlign: 'center', pt: 2 }}>
                <Image
                    src={image}
                    alt={name}
                    width={140}
                    height={140}
                />
                <CardContent>
                    <Typography gutterBottom variant="div" component="div">
                        {name}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ textAlign: 'center', color: '#f44336' }}>
                        {price}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'end', paddingRight: 3, paddingBottom: 3 }} >
                    <ButtonLink text={'Detail'} href={`/product/${id}`} />
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Item