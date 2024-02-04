// CommentForm.jsx
// CommentForm.jsx
import React, { useState } from 'react';

function CommentForm({ onCommentAdded }) {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() === '') {
            return;
        }

        // Assuming that the comment is submitted to the parent component
        onCommentAdded(comment);

        // Reset the comment input
        setComment('');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-center ">
                    <form onSubmit={handleSubmit}>
                        <div className="f d-flex flex-column">
                            <label htmlFor="commentInput">Add a Comment:</label>
                            <textarea
                                id="commentInput"
                                className="f "
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4 mb-4">Submit Comment</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CommentForm;








