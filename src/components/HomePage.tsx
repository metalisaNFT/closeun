import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import BlogPost from './BlogPost';
import Papa from 'papaparse';

interface BlogPostData {
    id: string;
    title: string;
    image: string;
    link: string;
    content: string;
    date: string;
}

const useStyles = makeStyles({
    header: {
        backgroundColor: '#1976d2',
        color: '#fff',
        padding: '40px 0',
        textAlign: 'center',
    },
    section: {
        marginTop: '40px',
    },
    button: {
        marginTop: '20px',
    },
    link: {
        color: '#1976d2',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    heroSection: {
        backgroundColor: '#1976d2',
        color: '#fff',
        padding: '80px 0',
        textAlign: 'center',
    },
});

const HomePage: React.FC = () => {
    const classes = useStyles();
    const [latestPosts, setLatestPosts] = useState<BlogPostData[]>([]);

    useEffect(() => {
        Papa.parse<BlogPostData>('/data/blogPosts.csv', {
            download: true,
            header: true,
            complete: (result: Papa.ParseResult<BlogPostData>) => {
                // Assuming latest posts are the last three entries
                const sortedPosts = result.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setLatestPosts(sortedPosts.slice(0, 3));
            },
            error: (error: Error) => {
                console.error('Error parsing CSV:', error);
            },
        });
    }, []);

    const handleSignPetition = () => {
        window.location.href = '/petition';
    };

    return (
        <>
            <Container>
                <Box className={classes.heroSection}>
                    <Typography variant="h2" gutterBottom style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        Reform the United Nations
                    </Typography>
                    <Typography variant="h5" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        Advocating for accountability and effective global governance
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleSignPetition} 
                        className={classes.button}
                        size="large"
                        style={{ paddingTop: '10px', paddingBottom: '10px' }}
                    >
                        Sign the Petition for UN Reform
                    </Button>
                </Box>
                <Box className={classes.section}>
                    <Typography variant="h4">Our Mission</Typography>
                    <Typography variant="body1" paragraph>
                        The United Nations, founded in 1945 with noble intentions, has strayed from its original purpose. We aim to shed light on the UN's failures in maintaining global peace, addressing human rights violations, and effectively managing international crises. Our goal is to push for fundamental reforms or consider alternative frameworks for global governance that truly serve humanity.
                    </Typography>
                </Box>
                <Box className={classes.section}>
                    <Typography variant="h4">Key Issues</Typography>
                    <List>
                        <ListItem>
                            <ListItemText>
                                <RouterLink to="/human-rights-violations" className={classes.link}>
                                    UN Human Rights Council Controversies
                                </RouterLink>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <RouterLink to="/unrwa-hamas-connection" className={classes.link}>
                                    UNRWA's Alleged Connections to Hamas
                                </RouterLink>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <RouterLink to="/security-council-reform" className={classes.link}>
                                    Security Council Reform Needs
                                </RouterLink>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Box>
                <Box className={classes.section}>
                    <Typography variant="h4">Take Action</Typography>
                    <Typography variant="body1" paragraph>
                        Join us in calling for a comprehensive review of UN practices, increased transparency, and accountability measures. Together, we can work towards a more effective system of global governance that truly protects human rights and promotes international justice.
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component={RouterLink} 
                        to="/petition"
                        className={classes.button}
                    >
                        Sign the Petition
                    </Button>
                </Box>
                <Box className={classes.section} sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>Latest Blog Posts</Typography>
                    <Grid container spacing={4}>
                        {latestPosts.map((post) => (
                            <Grid item key={post.id} xs={12} sm={6} md={4}>
                                <BlogPost
                                    image={post.image}
                                    title={post.title}
                                    link={post.link}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default HomePage;