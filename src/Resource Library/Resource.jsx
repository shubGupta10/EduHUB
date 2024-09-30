import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loader from '../Components/Loader';

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
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto mt-20 px-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-16 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-4 text-black">Latest Programming Articles</h1>
                <p className="text-lg text-center mb-8 text-gray-700 max-w-3xl mx-auto">
                    Stay updated with the latest articles and trends in programming. Our curated selection of articles
                    from DEV.to ensures you are always in the loop with the most important updates and insights in the
                    programming world.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                        >
                            {article.cover_image && (
                                <div className="h-48 overflow-hidden">
                                    <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="p-6 flex flex-col h-full">
                                <h2 className="text-xl font-bold mb-4 text-black">
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {article.title}
                                    </a>
                                </h2>
                                <p className="text-gray-600 mb-4 flex-grow">{article.description}</p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300"
                                >
                                    Read More
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resource;