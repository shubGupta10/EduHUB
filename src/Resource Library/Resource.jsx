import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Resource = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('https://dev.to/api/articles?tag=programming&top=1');
                setArticles(response.data);
            } catch (error) {
                setError('Error fetching articles. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5 min-vh-100">
            <h1 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Latest Programming Articles</h1>
            <p className="text-center mb-5" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
                Stay updated with the latest articles and trends in programming. Our curated selection of articles
                from DEV.to ensures you are always in the loop with the most important updates and insights in the
                programming world.
            </p>
            <Row>
                {articles.map((article, index) => (
                    <Col key={index} md={4} className="mb-4">
                        <Card className="h-100 shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '1.5rem', transition: 'transform 0.2s', transform: 'scale(1)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                            {article.cover_image && (
                                <div style={{ height: '180px', overflow: 'hidden' }}>
                                    <Card.Img variant="top" src={article.cover_image} alt={article.title} style={{ objectFit: 'cover', height: '100%' }} />
                                </div>
                            )}
                            <Card.Body className="d-flex flex-column">
                                <Card.Title style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
                                        {article.title}
                                    </a>
                                </Card.Title>
                                <Card.Text className="flex-grow-1" style={{ color: '#6c757d' }}>
                                    {article.description}
                                </Card.Text>
                                <Button variant="primary" href={article.url} target="_blank" rel="noopener noreferrer" className="mt-auto" style={{ fontWeight: 'bold' }}>
                                    Read More
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Resource;
