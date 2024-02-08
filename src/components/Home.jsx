
// Home.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleNewsCount, setVisibleNewsCount] = useState(4); // State to track the number of visible news items

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://apitest.reachstar.io/blog/list');

                if (response.status === 200 && response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setNews(response.data);
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

    const handleShowMore = () => {
        setVisibleNewsCount(prevCount => prevCount + 2); // Increment visible news count by 2
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
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
                            onClick={handleShowMore} // Call handleShowMore function when the button is clicked
                        >
                            Show more ...
                        </button>
                    </div>
                    <hr style={{ backgroundColor: 'red', height: '15px' }} />
                    {
                        loading ? (
                            <p>Loading news...</p>
                        ) : (
                            <div className="row">
                                {news.slice(0, visibleNewsCount).map((article) => ( // Only map over visible news items
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
                                                <Link to={`/Details/${article.id}`} className="btn btn-success mr-2">More Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default Home;












