import { Box, Card, Link, Typography } from '@mui/material'

const Footer = () => {
    return (
        <Card sx={{  height: '10vh', textAlign: 'center', pt: 2, mt: 15 }} >
            <Typography color={'black'} >
                Contact : <Link href='mailto:marketplace@gmail.com'>marketplace@gmail.com</Link>
            </Typography>
        </Card>
    )
}

export default Footer