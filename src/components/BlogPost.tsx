import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';

interface BlogPostProps {
    image: string;
    title: string;
    link: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ image, title, link }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea href={link}>
                <CardMedia
                    component="img"
                    sx={{ height: 'auto', width: '100%' }}
                    image={image}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default BlogPost;