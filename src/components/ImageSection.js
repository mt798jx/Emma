import React from 'react';

function ImageSection({ image }) {
    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <img
                src={image}
                alt="Pre moju lásku"
                style={{ width: '80%', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
            />
        </div>
    );
}

export default ImageSection;
