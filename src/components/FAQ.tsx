import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    section: {
        marginTop: '40px',
    },
});

const FAQ: React.FC = () => {
    const classes = useStyles();

    return (
        <Container>
            <Box className={classes.section}>
                    <Typography variant="h4" gutterBottom>
                        Frequently Asked Questions
                    </Typography>
                    <Accordion style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Why should we end the United Nations?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                The UN has been ineffective in managing global conflicts and enforcing human rights. We believe a new framework can better address these issues.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>What alternatives are you proposing?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                We advocate for a decentralized system of international cooperation that empowers regional organizations and enhances accountability.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>How does our movement plan to improve international governance?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                By promoting regional autonomy and ensuring greater accountability, our movement seeks to create more responsive and effective governance structures.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>What are the benefits of a decentralized international system?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                A decentralized system allows for more tailored solutions to regional issues, reduces bureaucratic inefficiencies, and enhances accountability among governing bodies.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                {/* Add more FAQs as needed */}
            </Box>
        </Container>
    );
};

export default FAQ;