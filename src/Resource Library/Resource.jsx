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
                const response = await axios.get('https://dev.to/api/articles?tag=programming&top=4');
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
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
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
        <Container className="mt-5">
            <h1 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2.5rem', color: '#333' }}>Latest Programming Articles</h1>
            <p className="text-center mb-5" style={{ fontSize: '1.2rem', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
                Stay updated with the latest articles and trends in programming. Our curated selection of articles
                from DEV.to ensures you are always in the loop with the most important updates and insights in the
                programming world.
            </p>
            <Row xs={1} md={2} lg={3} className="g-4">
                {articles.map((article, index) => (
                    <Col key={index} className="mb-4">
                        <Card className="h-100 shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden', transition: 'transform 0.2s' }}>
                            {article.cover_image && (
                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                    <Card.Img variant="top" src={article.cover_image} alt={article.title} style={{ objectFit: 'cover', height: '100%' }} />
                                </div>
                            )}
                            <Card.Body className="d-flex flex-column">
                                <Card.Title style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark stretched-link">
                                        {article.title}
                                    </a>
                                </Card.Title>
                                <Card.Text style={{ color: '#777', flex: '1 0 auto', marginBottom: '1rem' }}>
                                    {article.description}
                                </Card.Text>
                                <Button variant="primary" href={article.url} target="_blank" rel="noopener noreferrer" className="align-self-start">
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
