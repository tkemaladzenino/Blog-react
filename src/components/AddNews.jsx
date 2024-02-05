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
                    right: '50%',
                    zIndex: '1000',
                    fontWeight: 'bold',
                    backgroundColor: '#c62641',
                    border: '3px solid white',
                    borderRadius: '12px',
                    color: 'white',
                    padding: '16px',
                    transform: 'translate(50%, -50%)',
                }}
            >
                Add more news
            </button>
        </div>
    );
}

export default AddNews;




