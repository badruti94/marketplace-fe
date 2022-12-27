import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Layout from '../components/layout';
import Image from 'next/image';
import ButtonLink from '../components/button-link';
import Head from 'next/head';

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Marketplace</title>
      </Head>
      <Card sx={{ maxWidth: 600, m: '0 auto' }} >
        <CardContent>
          <Typography variant="h3" component="div" color={'primary'} style={{ textAlign: 'center' }}>
            Marketplace
          </Typography>
          <div style={{ textAlign: 'center' }} >
            <Image
              src={'/marketplace.png'}
              alt='marketplace'
              width={500}
              height={500}
            />
          </div>

          <Typography variant="body2" color='warning' sx={{ fontSize: 20, my: 2 }}>
            Marketplace Reseller terkemuka di Indonesia yang mengkhususkan diri dalam produk-produk Apple dan berbagai macam aksesoris pelengkap, software dan produk lainnya.
          </Typography>
        </CardContent>
        <CardActions>
          <ButtonLink text={'Lihat Katalog'} href='/product' />
        </CardActions>
      </Card>
    </Layout>
  )
}

export default Home