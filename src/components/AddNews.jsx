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
        <button onClick={handleAddMoreNews} className="btn btn-pr mb-2 " style={{
            fontWeight: 'bold', backgroundColor: ' #c62641', border: 'none', borderRadius: '12px'
        }}>
            Add more news
        </button>
    );
}

export default AddNews;




