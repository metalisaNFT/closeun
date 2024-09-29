import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';
import ContactForm from './ContactForm';
import { makeStyles } from '@mui/styles';




const useStyles = makeStyles({
    footer: {
        backgroundColor: '#222',
        color: '#fff',
        padding: '20px',
    },
    socialLink: {
        color: '#fff',
        marginRight: '10px',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <Box className={classes.footer}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box mb={2}>
                        <img src="/logo.svg" alt="End the UN Movement Logo" width="150" height="auto" />
                    </Box>
                    <Box mt={2} component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
                        <li>
                            <Link href="https://twitter.com/endtheun" target="_blank" rel="noopener" className={classes.socialLink}>
                                Twitter
                            </Link>
                        </li>
                        <li>
                            <Link href="https://facebook.com/endtheun" target="_blank" rel="noopener" className={classes.socialLink}>
                                Facebook
                            </Link>
                        </li>
                        <li>
                            <Link href="https://instagram.com/endtheun" target="_blank" rel="noopener" className={classes.socialLink}>
                                Instagram
                            </Link>
                        </li>
                    </Box>
                    <Typography variant="body1">&copy; 2023 End the UN Movement</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ContactForm />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;