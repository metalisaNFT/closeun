// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { createObjectCsvWriter } = require('csv-writer');
const Papa = require('papaparse');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Log Middleware Setup
console.log('CORS and body-parser middleware have been set up.');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Example API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Update the contact route to prevent duplicates based on name and email
app.post('/api/contact', async (req, res) => {
    const { name, email } = req.body;

    console.log('Received contact submission:', { name, email });

    // Validate inputs
    if (!name || !email) {
        console.warn('Validation failed: Missing name or email.');
        return res.status(400).json({ message: 'Name and email are required.' });
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.warn('Validation failed: Invalid email format.');
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    const csvPath = path.join(__dirname, 'public', 'data', 'contacts.csv');

    try {
        let isDuplicate = false;

        if (fs.existsSync(csvPath)) {
            console.log('Reading existing contacts from CSV.');
            const fileContent = await fs.promises.readFile(csvPath, 'utf8');
            const parsedData = Papa.parse(fileContent, { header: true, skipEmptyLines: true }).data;
            isDuplicate = parsedData.some(record => 
                typeof record.name === 'string' &&
                typeof record.email === 'string' &&
                record.name.trim().toLowerCase() === name.trim().toLowerCase() &&
                record.email.trim().toLowerCase() === email.trim().toLowerCase()
            );
            console.log('Duplicate check:', isDuplicate);
        }

        if (isDuplicate) {
            console.warn('Duplicate contact submission detected:', { name, email });
            return res.status(409).json({ message: 'This name and email combination has already been used to submit the form.' });
        }

        const csvWriterContacts = createObjectCsvWriter({
            path: csvPath,
            header: [
                { id: 'name', title: 'name' },
                { id: 'email', title: 'email' },
                { id: 'timestamp', title: 'timestamp' },
            ],
            append: fs.existsSync(csvPath),
        });

        const record = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            timestamp: new Date().toISOString(),
        };

        console.log('Writing contact record:', record);

        await csvWriterContacts.writeRecords([record]);

        console.log('The contact record has been saved to CSV.');
        res.status(200).json({ message: 'Form submitted successfully.' });
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ message: 'Internal server error.', error: error.message }); // Include error details for debugging
    }
});

// Update the petition route to prevent duplicates based on name and email
app.post('/api/petition', async (req, res) => {
    const { name, email, message } = req.body;

    console.log('Received petition submission:', { name, email, message });

    // Validate inputs
    if (!name || !email || !message) {
        console.warn('Validation failed: Missing fields.');
        return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.warn('Validation failed: Invalid email format.');
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    const csvPath = path.join(__dirname, 'public', 'data', 'petitions.csv');

    try {
        let isDuplicate = false;

        if (fs.existsSync(csvPath)) {
            console.log('Reading existing petitions from CSV.');
            const fileContent = await fs.promises.readFile(csvPath, 'utf8');
            const parsedData = Papa.parse(fileContent, { header: true, skipEmptyLines: true }).data;
            isDuplicate = parsedData.some(record => 
                typeof record.name === 'string' && // Ensure name is a string
                typeof record.email === 'string' && // Ensure email is a string
                record.name.trim().toLowerCase() === name.trim().toLowerCase() &&
                record.email.trim().toLowerCase() === email.trim().toLowerCase()
            );
            console.log('Duplicate check:', isDuplicate);
        }

        if (isDuplicate) {
            console.warn('Duplicate petition submission detected:', { name, email });
            return res.status(409).json({ message: 'You have already submitted this petition with the provided name and email.' });
        }

        const csvWriterPetitions = createObjectCsvWriter({
            path: csvPath,
            header: [
                { id: 'name', title: 'name' },
                { id: 'email', title: 'email' },
                { id: 'message', title: 'message' },
                { id: 'timestamp', title: 'timestamp' },
            ],
            append: fs.existsSync(csvPath),
        });

        const record = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            message: message.trim(),
            timestamp: new Date().toISOString(),
        };

        console.log('Writing petition record:', record);

        await csvWriterPetitions.writeRecords([record]);

        console.log('Petition record has been saved to CSV.');
        res.status(200).json({ message: 'Petition submitted successfully.' });
    } catch (error) {
        console.error('Error processing petition:', error);
        res.status(500).json({ message: 'Internal server error.', error: error.message }); // Include error details for debugging
    }
});


// Add the counts route
app.get('/api/counts', async (req, res) => {
    const petitionsPath = path.join(__dirname, 'public', 'data', 'petitions.csv');
    const contactsPath = path.join(__dirname, 'public', 'data', 'contacts.csv');

    try {
        // Initialize counts
        let petitionsCount = 0;
        let contactsCount = 0;

        // Function to count records in a CSV file
        const countRecords = async (filePath) => {
            if (fs.existsSync(filePath)) {
                const fileContent = await fs.promises.readFile(filePath, 'utf8');
                const parsedData = Papa.parse(fileContent, { header: true, skipEmptyLines: true }).data;
                return parsedData.length;
            }
            return 0;
        };

        // Count petitions
        petitionsCount = await countRecords(petitionsPath);

        // Count contacts
        contactsCount = await countRecords(contactsPath);

        // Calculate total
        const totalSubmissions = petitionsCount + contactsCount;

        console.log('Total Submissions:', totalSubmissions);

        res.status(200).json({ totalSubmissions });
    } catch (error) {
        console.error('Error counting submissions:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ message: 'Internal server error.' });
});

// Serve the React app for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});