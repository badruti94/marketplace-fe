import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Navbar from '../components/navbar'
import Footer from '../components/footer';

const Layout = ({ children }) => {
    return (
        <>
            <CssBaseline />
            <Box sx={{ bgcolor: '#cfe8fc', }} >
                <Navbar />
                <Container >
                    {children}
                </Container>
                <Footer />
            </Box>
        </>
    )
}

export default Layout