import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

interface BlogPostData {
    id: string;
    title: string;
    image: string;
    link: string;
    content?: string; // Make content optional
    date: string;
}

const BlogPage: React.FC = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        Papa.parse<BlogPostData>('/data/blogPosts.csv', {
            download: true,
            header: true,
            complete: (result: Papa.ParseResult<BlogPostData>) => {
                // Validate and filter out posts without content
                const validPosts = result.data.filter(post => post.content);
                setBlogPosts(validPosts);
            },
            error: (error: Error) => {
                console.error('Error parsing CSV:', error);
            },
        });
    }, []);

    const handlePostClick = (postLink: string) => {
        navigate(postLink);
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Our Blog
            </Typography>
            <Grid container spacing={4}>
                {blogPosts.map((post) => (
                    <Grid item key={post.id} xs={12} sm={6} md={4}>
                        <Card onClick={() => handlePostClick(post.link)} sx={{ cursor: 'pointer' }}>
                            <CardMedia
                                component="img"
                                sx={{ height: 'auto', width: '100%' }}
                                image={post.image}
                                alt={post.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {post.content?.substring(0, 100) || 'No content available...'}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {new Date(post.date).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BlogPage;