import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const SecurityCouncilReformNeeds: React.FC = () => {
    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Security Council Reform Needs
                </Typography>
                <Typography variant="body1" paragraph>
                    The United Nations Security Council (UNSC) has long been criticized for its structure and decision-making processes. Key areas needing reform include:
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>Expansion of permanent and non-permanent membership</li>
                    <li>Elimination or restriction of veto power to prevent deadlock</li>
                    <li>Improving transparency and accountability in proceedings</li>
                    <li>Enhancing representation from developing nations</li>
                    <li>Reforming the criteria for membership to reflect current geopolitical realities</li>
                </Typography>
                <Typography variant="body1" paragraph>
                    Reforming the Security Council is essential for enhancing its effectiveness in addressing global security challenges and ensuring fair representation of the international community.
                </Typography>
            </Box>
        </Container>
    );
};

export default SecurityCouncilReformNeeds;
