import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import Papa from 'papaparse';
import BlogPost from './BlogPost';
import ReactMarkdown from 'react-markdown';

interface BlogPostData {
    id: string;
    title: string;
    image: string;
    link: string;
    content: string;
    date: string;
}

const BlogPostDisplay: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<BlogPostData | null>(null);
    const [markdownContent, setMarkdownContent] = useState<string>('');
    const [recommendedPosts, setRecommendedPosts] = useState<BlogPostData[]>([]);

    useEffect(() => {
        Papa.parse<BlogPostData>('/data/blogPosts.csv', {
            download: true,
            header: true,
            complete: (result: Papa.ParseResult<BlogPostData>) => {
                const posts = result.data;
                const foundPost = posts.find((p) => p.link === `/blog/${postId}`);
                setPost(foundPost || null);

                if (foundPost) {
                    fetch(`/data/blog_${foundPost.id}.md`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.text();
                        })
                        .then((text) => setMarkdownContent(text))
                        .catch((error) => {
                            console.error('Error fetching markdown:', error);
                        });
                }

                // Get 3 random posts for recommendations (excluding the current post)
                const otherPosts = posts.filter((p) => p.id !== foundPost?.id);
                const shuffled = otherPosts.sort(() => 0.5 - Math.random());
                setRecommendedPosts(shuffled.slice(0, 3));
            },
            error: (error: Error) => {
                console.error('Error parsing CSV:', error);
            },
        });
    }, [postId]);

    if (!post) {
        return (
            <Container>
                <Typography variant="h4">Post not found</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Card sx={{ maxWidth: '100%', mt: 4 }}>
                <CardMedia
                    component="img"
                    sx={{ height: 'auto', width: '100%' }}
                    image={post.image}
                    alt={post.title}
                />
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {post.title}
                    </Typography>
                    <ReactMarkdown>{markdownContent}</ReactMarkdown>
                </CardContent>
            </Card>

            {/* Recommended Articles Section */}
            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                Recommended Articles
            </Typography>
            <Grid container spacing={4}>
                {recommendedPosts.map((recommendedPost) => (
                    <Grid item key={recommendedPost.id} xs={12} sm={6} md={4}>
                        <BlogPost
                            image={recommendedPost.image}
                            title={recommendedPost.title}
                            link={recommendedPost.link}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BlogPostDisplay;