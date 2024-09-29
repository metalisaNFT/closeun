import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios'; // Ensure axios is imported

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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorCode, setErrorCode] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validate inputs
        if (!name || !email) {
            alert('Both name and email are required.');
            return;
        }
        try {
            await axios.post('/api/contact', { name, email });
            console.log('Form submitted successfully');
            setSuccessMessage('Your message has been sent successfully!');
            setErrorMessage('');
            setErrorCode(null);
            // Optionally, reset form fields
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Error submitting form:', error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    setErrorCode('DUPLICATE_SUBMISSION');
                    setErrorMessage('This name and email combination has already been used to submit the form.');
                } else if (error.response?.status === 400) {
                    setErrorCode('VALIDATION_ERROR');
                    setErrorMessage(error.response.data.message || 'Invalid input. Please check your data.');
                } else {
                    setErrorCode('UNKNOWN_ERROR');
                    setErrorMessage('There was an error submitting your form. Please try again.');
                }
            } else {
                setErrorCode('NETWORK_ERROR');
                setErrorMessage('Network error. Please check your connection and try again.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className={classes.form}>
            <Box mb={2}>
                <Typography variant="h4" className={classes.title}>
                    Sign to Support the Closure of the UN
                </Typography>
            </Box>
            <Box my={2} sx={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={classes.field}
                    fullWidth
                />
            </Box>
            {successMessage && (
                <Alert severity="success" className={classes.field}>
                    {successMessage}
                </Alert>
            )}
            {errorMessage && (
                <Alert severity="error" className={classes.field}>
                    {errorMessage}
                </Alert>
            )}
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Submit
            </Button>
        </Box>
    );
};

export default ContactForm;