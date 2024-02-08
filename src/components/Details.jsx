
// Details.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CommentForm from './CommentForm';
import Header from './Header';

function Details() {
    const { id } = useParams();
    const [newsDetails, setNewsDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`https://apitest.reachstar.io/blog/get/${id}`);
                if (response.status === 200 && response.data) {
                    setNewsDetails(response.data);
                    setEditedTitle(response.data.title);
                    setEditedDescription(response.data.description);
                } else {
                    console.error('Invalid data format in the response:', response.data);
                }
            } catch (error) {
                console.error('Error fetching news details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const handleEditNews = async () => {
        try {
            if (!editedTitle.trim() || !editedDescription.trim()) {
                alert('Please fill in both the title and description.');
                return;
            }

            const updatedNews = {
                title: editedTitle,
                description: editedDescription,
            };

            await axios.put(`https://apitest.reachstar.io/blog/edit/${id}`, updatedNews);

            setIsEditing(false);

            // Refresh the details after editing
            const response = await axios.get(`https://apitest.reachstar.io/blog/get/${id}`);
            if (response.status === 200 && response.data) {
                setNewsDetails(response.data);
                setEditedTitle(response.data.title);
                setEditedDescription(response.data.description);
            }
        } catch (error) {
            console.error('Error editing news:', error);
        }
    };

    const handleDeleteNews = async () => {
        try {
            await axios.delete(`https://apitest.reachstar.io/blog/delete/${id}`);
            // Redirect to the home page after deletion
            navigate('/');
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const handleAddComment = async (comment) => {
        try {
            const response = await axios.post(`https://apitest.reachstar.io/blog/comment/${id}`, { comment });
            console.log('Comment added successfully:', response.data);

            // Assuming that the comment is added to the newsDetails.comments array
            setNewsDetails((prevDetails) => ({
                ...prevDetails,
                comments: [...(prevDetails.comments || []), response.data],
            }));
        } catch (error) {
            console.error('Error adding comment:', error);
        }

        navigate('/Home');
    };

    return (
        <div className="detDiv p-0">
            <Header />
            <div className="container  Det p-4 mb-4 d-flex justify-content-center flex-column mt-5 px-4">

                <h2 className="text-center  h2bord mb-4" style={{ color: 'Green', fontWeight: 'bold' }}>{newsDetails.title}</h2>


                {loading ? (
                    <p>Loading details...</p>
                ) : (
                    <div className='det-div  d-flex justify-content-center flex-column'>

                        <div className="divB d-flex justify-content-center gap-4">
                            <button onClick={() => setIsEditing(!isEditing)} className="btn btn-danger mb-4">
                                {isEditing ? 'Cancel Edit' : 'Edit News'}
                            </button>
                            <button onClick={handleDeleteNews} className="btn btn-danger mb-4 ">Delete News</button>
                        </div>

                        {isEditing ? (
                            <div className='Edit-d d-flex justify-content-center flex-column'>
                                <input
                                    id="editedTitleInput"
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                                <br />
                                <textarea
                                    id="editedDescriptionInput"
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                />
                                <br />
                                <button onClick={handleEditNews} className="btn btn-success " style={{ width: '240px' }}>Save Changes</button>
                            </div>
                        ) : (
                            // Render details if not in edit mode
                            <div className="Edit-D  d-flex  justify-content-center flex-column">

                                <CommentForm onCommentAdded={handleAddComment} />
                                {newsDetails.comments && newsDetails.comments.map((comment, index) => (
                                    <div key={index} className="comment-container">
                                        {comment.comment}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Details;



























