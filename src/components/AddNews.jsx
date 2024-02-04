import React from 'react';
import axios from 'axios';

function AddNews({ onAddNews }) {
    const handleAddMoreNews = async () => {
        try {
            const response = await axios.get('https://apitest.reachstar.io/blog/list');

            if (response.status === 200 && response.data && Array.isArray(response.data) && response.data.length > 0) {
                // Pass the new articles to the parent component
                onAddNews(response.data.slice(0, 2));
            } else {
                console.error('Invalid data format in the response:', response.data);
            }
        } catch (error) {
            console.error('Error fetching more news:', error);
        }
    };

    return (
        <div className="text-center">
            <button
                onClick={handleAddMoreNews}
                className="btn  mb-2"
                style={{
                    position: 'fixed',
                    top: '140px', // Adjust the bottom position as needed
                    right: '30%', // Adjust the right position as needed
                    zIndex: '1000', // Set a high zIndex to ensure it's above other elements
                    fontWeight: 'bold',
                    backgroundColor: '#c62641',
                    border: '3px solid white',
                    borderRadius: '12px',
                    color: 'white'
                }}
            >
                Add more news
            </button>
        </div>
    );
}

export default AddNews;




