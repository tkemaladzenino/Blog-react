import React from 'react';

function AddNews({ onAddNews }) {
    const handleAddMoreNews = () => {
        // Implement your logic for adding more news
        // ...

        // Example: trigger the onAddNews function
        onAddNews(/* pass your news data here */);
    };

    return (
        <div className="text-center">
            <button
                onClick={handleAddMoreNews}
                className="btn btn-pr mb-2"
                style={{
                    position: 'fixed',
                    bottom: '20px', // Adjust the bottom position as needed
                    right: '20px', // Adjust the right position as needed
                    zIndex: '1000', // Set a high zIndex to ensure it's above other elements
                    fontWeight: 'bold',
                    backgroundColor: '#c62641',
                    border: 'none',
                    borderRadius: '12px'
                }}
            >
                Add more news
            </button>
        </div>
    );
}

export default AddNews;
