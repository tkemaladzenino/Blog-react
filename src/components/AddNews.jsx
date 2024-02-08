// AddNews.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AddNews() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleAddNews = async () => {
        try {
            if (!title.trim() || !description.trim()) {
                alert('Please fill in both the title and description.');
                return;
            }

            const newNewsItem = { title, description };

            // Send a POST request to add the news
            await axios.post('https://apitest.reachstar.io/blog/add', newNewsItem);

            // Redirect to the home page after adding news
            navigate('/Home');

        } catch (error) {
            console.error('Error adding news:', error);
        }
    };

    return (
        <div className="container">
            <div className="row Det justify-content-center mt-5">
                <div className="col-md-6">
                    <h2 className="text-center pt-4" style={{ color: 'green', fontWeight: 'bold' }}>Add News</h2>
                    <div className="form-group">
                        <label htmlFor="title" style={{ color: 'red', fontWeight: 'bold' }}>Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="titleAdd"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{ Color: 'green' }}>
                        <label htmlFor="description" style={{ color: 'red', fontWeight: 'bold' }}>Description:</label>
                        <textarea
                            className="form-control"
                            id="descriptionAdd"
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center gap-4 pb-5 pt-3">
                        <button onClick={handleAddNews} className="btn btn-success " style={{ width: '150px' }} >Add News</button>
                        <Link to="/Home" className="btn btn-danger " style={{ width: '150px' }}>Cancel</Link>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AddNews;













