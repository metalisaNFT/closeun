import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const HumanRightsViolations: React.FC = () => {
    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    UN Human Rights Council Controversies
                </Typography>
                <Typography variant="body1" paragraph>
                    The UN Human Rights Council has been subject to various controversies over the years. Some of the key issues include:
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>Bias in membership and political motivations</li>
                    <li>Failure to effectively address human rights violations</li>
                    <li>Allegations of misuse for political agendas</li>
                    <li>Inadequate mechanisms for accountability</li>
                    <li>Criticism over selective targeting of certain countries</li>
                </Typography>
                <Typography variant="body1" paragraph>
                    These controversies highlight the challenges faced by the council in fulfilling its mandate to promote and protect human rights globally.
                </Typography>
            </Box>
        </Container>
    );
};

export default HumanRightsViolations;
