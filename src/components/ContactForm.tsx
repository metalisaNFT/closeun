import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
    },
    title: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    field: {
        marginBottom: '15px',
    },
    button: {
        alignSelf: 'flex-start',
    },
});

const ContactForm: React.FC = () => {
    const classes = useStyles();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Remove state for name and email as Netlify handles form data
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');

    // Remove handleSubmit function
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // ...existing Axios logic...
    // };

    return (
        <Box component="form" 
             name="contact" 
             method="POST" 
             data-netlify="true" 
             className={classes.form}>
            {/* Netlify requires a hidden input for form name */}
            <input type="hidden" name="form-name" value="contact" />
            <Box mb={2}>
                <Typography variant="h4" className={classes.title}>
                    Sign to Support the Closure of the UN
                </Typography>
            </Box>
            <Box my={2} sx={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
                <TextField
                    label="Name"
                    variant="outlined"
                    name="name" // Add name attribute
                    required
                    className={classes.field}
                    fullWidth
                />
            </Box>
            <Box my={2} sx={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email" // Add name attribute
                    required
                    className={classes.field}
                    fullWidth
                />
            </Box>
            {/* Remove success and error messages as Netlify handles them */}
            {/* {successMessage && (
                <Alert severity="success" className={classes.field}>
                    {successMessage}
                </Alert>
            )}
            {errorMessage && (
                <Alert severity="error" className={classes.field}>
                    {errorMessage}
                </Alert>
            )} */}
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Submit
            </Button>
        </Box>
    );
};

export default ContactForm;