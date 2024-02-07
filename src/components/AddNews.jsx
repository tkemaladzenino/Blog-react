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

            await axios.post('https://apitest.reachstar.io/blog/add', { title, description });

            // Redirect to the home page after adding news
            navigate('/Home');

        } catch (error) {
            console.error('Error adding news:', error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Add News</h2>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button onClick={handleAddNews} className="btn btn-primary">Add News</button>
                    <Link to="/Home" className="btn btn-secondary ml-2">Cancel</Link>
                </div>
            </div>
        </div>
    );
}

export default AddNews;










