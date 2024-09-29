import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
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
    // Removed unused state variables
    // const [successMessage, setSuccessMessage] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');

    // Removed handleSubmit function
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
                    name="name" // Added name attribute
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
                    name="email" // Added name attribute
                    required
                    className={classes.field}
                    fullWidth
                />
            </Box>
            {/* Removed success and error messages as Netlify handles them */}
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Submit
            </Button>
        </Box>
    );
};

export default ContactForm;