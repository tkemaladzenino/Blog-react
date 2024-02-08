
// CommentForm.jsx
import React, { useState } from 'react';

import 'react-tabs/style/react-tabs.css';

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
        <div className="col-12  comm-form  d-flex justify-content-center px-5" >
            <form className='formComm d-flex justify content-center flex-column px-4 mb-2' onSubmit={handleSubmit}>
                <div className="f d-flex flex-column  px-5 pt-3" >
                    <label label htmlFor="commentInput" > Add a Comment:</label>
                    <textarea
                        id="commentInput"
                        className="fc"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div className="div d-flex justify-content-center pb-2">
                    <button type="submit" className="btn btn-success mt-4 mb-4"
                        style={{
                            borderRadius: '12px',
                        }}>Submit Comment</button>
                </div>
            </form>
        </div>
    );
}

export default CommentForm;








