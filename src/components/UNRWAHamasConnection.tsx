import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const UNRWAHamasConnection: React.FC = () => {
    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    UNRWA's Alleged Connections to Hamas
                </Typography>
                <Typography variant="body1" paragraph>
                    The United Nations Relief and Works Agency (UNRWA) has faced allegations regarding its connections to Hamas. Key points of contention include:
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>Funding and resources potentially diverted to militant groups</li>
                    <li>Lack of oversight mechanisms to prevent misuse of aid</li>
                    <li>Allegations of UNRWA facilities being used by Hamas</li>
                    <li>Concerns over the agency's neutrality and effectiveness</li>
                    <li>International debates on reforming or restructuring UNRWA</li>
                </Typography>
                <Typography variant="body1" paragraph>
                    These issues have sparked debates on the role of UNRWA in the region and its impact on the Israeli-Palestinian conflict.
                </Typography>
            </Box>
        </Container>
    );
};

export default UNRWAHamasConnection;
