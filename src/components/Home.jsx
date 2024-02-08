
// Home.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://apitest.reachstar.io/blog/list');

                if (response.status === 200 && response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setNews(response.data.slice(0, 4));
                } else {
                    console.error('Invalid data format in the response:', response.data);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">


                    <hr style={{ backgroundColor: 'red', height: '15px' }} />
                    {
                        loading ? (
                            <p>Loading news...</p>
                        ) : (
                            <div className="row">
                                {news.map((article) => (
                                    <div key={article.id} className="col-md-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title">{article.title}</h3>
                                                <p className="card-text" dangerouslySetInnerHTML={{ __html: article.description }} />
                                                {/* Display comments if available */}
                                                {article.comments && article.comments.map((comment, index) => (
                                                    <div key={index} className="comment-container">
                                                        {comment.comment}
                                                    </div>
                                                ))}
                                                <Link to={`/Details/${article.id}`} className="btn btn-secondary mr-2">More Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    <div className="text-center">
                        <button
                            className="btn mt-2"
                            style={{
                                position: 'fixed',
                                right: '50%',
                                zIndex: '1000',
                                fontWeight: 'bold',
                                backgroundColor: '#c62641',
                                border: '3px solid white',
                                borderRadius: '12px',
                                color: 'white',
                                padding: '12px',
                                transform: 'translate(50%, -50%)',
                            }}
                        >
                            View more
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;











