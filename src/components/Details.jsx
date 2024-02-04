
// Details.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CommentForm from './CommentForm';

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
            console.log('Editing news...');
            // Assuming 'unwantedCommentId' is the ID of the comment you want to remove
            const unwantedCommentId = 'id';  // Replace with the actual ID
            // Remove the unwanted comment from the comments array
            const filteredComments = newsDetails.comments.filter(comment => comment.id !== unwantedCommentId);
            setIsEditing(false);
            console.log('News edited successfully!');
            await axios.post(`https://apitest.reachstar.io/blog/edit/${id}`, {
                title: editedTitle,
                description: editedDescription,
                comments: filteredComments,  // Send the filtered comments array to the server
            });

            navigate('/');

            // Refresh the details after editing
            const response = await axios.get(`https://apitest.reachstar.io/blog/get/${id}`);
            if (response.status === 200 && response.data) {
                setNewsDetails(response.data);
                setEditedTitle(response.data.title);
                setEditedDescription(response.data.description);
            }

            setIsEditing(false);
        } catch (error) {
            console.error('Error editing news:', error);
        }
    };

    const handleDeleteNews = async () => {
        try {
            await axios.delete(`https://apitest.reachstar.io/blog/delete/${id}`);
            // Redirect to the home page after deletion
            window.location.href = '/home';
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
    };

    return (
        <div className="details-div pt-5 text-center">
            <h2 className="text-center mb-4" style={{ color: 'darkGreen' }}>{newsDetails.title}</h2>
            {loading ? (
                <p>Loading details...</p>
            ) : (
                <div>
                    <button onClick={() => setIsEditing(!isEditing)} className="btn btn-warning mr-2">
                        {isEditing ? 'Cancel Edit' : 'Edit News'}
                    </button>
                    {isEditing ? (
                        <div>
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
                            <button onClick={handleEditNews} className="btn btn-primary">Save Changes</button>
                        </div>
                    ) : (
                        // Render details if not in edit mode
                        <div>
                            <p style={{ color: 'green' }} dangerouslySetInnerHTML={{ __html: newsDetails.description }} />
                            <button onClick={handleDeleteNews} className="btn btn-danger mr-2 mb-4">Delete News</button>
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
    );
}

export default Details;



























