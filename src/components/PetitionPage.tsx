import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios'; // Ensure axios is imported

const useStyles = makeStyles({
    formContainer: {
        marginTop: '40px',
        marginBottom: '40px',
    },
    field: {
        marginTop: '20px',    // Add top margin
        marginBottom: '20px', // Keep bottom margin
    },
    submitButton: {
        marginTop: '30px', // Increased top margin for the submit button
    },
});

const PetitionPage: React.FC = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [totalSubmissions, setTotalSubmissions] = useState<number>(0);
    const [countError, setCountError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validate inputs
        if (!formData.name || !formData.email || !formData.message) {
            alert('Name, email, and message are required.');
            return;
        }
        try {
            // Ensure the POST URL is relative
            const response = await axios.post('/api/petition', formData);
            console.log('Petition submitted successfully:', response.data);
            setSuccessMessage('Your petition has been submitted successfully!');
            setErrorMessage('');
            // Optionally, reset form fields
            setFormData({
                name: '',
                email: '',
                message: '',
            });
        } catch (error: any) { // Updated to capture error details
            console.error('Error submitting petition:', error);
            if (error.response) {
                setErrorMessage(error.response.data.message || 'There was an error submitting your petition. Please try again.');
            } else {
                setErrorMessage('Network error. Please check your connection and try again.');
            }
            setSuccessMessage('');
        }
    };

    useEffect(() => {
        const fetchTotalSubmissions = async () => {
            try {
                const response = await axios.get('/api/counts');
                setTotalSubmissions(response.data.totalSubmissions);
            } catch (error) {
                console.error('Error fetching total submissions:', error);
                setCountError('Unable to retrieve submission counts.');
            }
        };

        fetchTotalSubmissions();
    }, []);

    return (
        <Container>
            <Box className={classes.formContainer}>
                {/* Added explanatory text */}
                <Typography variant="h5" gutterBottom>
                    Join Us in Shaping the Future of Global Governance
                </Typography>
                <Typography variant="body1" paragraph>
                    By signing this petition, you are advocating for significant reforms within the United Nations. Your support helps promote accountability, transparency, and effectiveness in addressing global challenges. Together, we can work towards a more just and equitable international community.
                </Typography>
                
                {/* Existing form */}
                <Typography variant="h4" gutterBottom>Sign the Petition</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        className={classes.field}
                        style={{ paddingTop: '10px', paddingBottom: '10px' }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        className={classes.field}
                        style={{ paddingTop: '10px', paddingBottom: '10px' }}
                    />
                    <TextField
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        className={classes.field}
                        style={{ paddingTop: '10px', paddingBottom: '10px' }}
                    />
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
                    
                    
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        className={classes.submitButton}
                        style={{ paddingTop: '10px', paddingBottom: '10px' }}
                        >
                        Submit
                    </Button>
                        {countError ? (
                            <Typography color="error" variant="h6" align="center">
                                {countError}
                            </Typography>
                        ) : (
                            <Typography variant="h3" align="center" style={{ marginTop: '20px' }}>
                                Total Submissions: {totalSubmissions}
                            </Typography>
                        )}
                </form>
            </Box>
        </Container>
    );
};

export default PetitionPage;