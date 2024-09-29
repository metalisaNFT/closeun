import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    section: {
        marginTop: '40px',
    },
});

const AboutUs: React.FC = () => {
    const classes = useStyles();

    return (
        <Container>
            <Box className={classes.section}>
                <Typography variant="h4">About Us</Typography>
                <Typography variant="body1" paragraph>
                    We are a movement dedicated to evaluating and restructuring global governance. Our goal is to create a more accountable, transparent, and efficient system that better addresses the challenges of our time.
                </Typography>
            </Box>
        </Container>
    );
};

export default AboutUs;