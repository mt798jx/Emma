import React, { useState } from 'react';

function MessageForm({ addMessage }) {
    const [message, setMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (message.trim()) {
            addMessage(message);
            setMessage('');
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
                backgroundColor: '#ffffff',
                borderTop: '1px solid #ddd',
                position: 'relative',
                boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Napíš správu..."
                style={{
                    flex: 1,
                    resize: 'none',
                    borderRadius: '20px',
                    padding: '15px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    outline: 'none',
                    marginRight: '10px',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
                }}
            />
            <button
                type="submit"
                style={{
                    padding: '12px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease, transform 0.2s ease',
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#0056b3';
                    e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#007bff';
                    e.target.style.transform = 'scale(1)';
                }}
            >
                Poslať
            </button>
        </form>
    );
}

export default MessageForm;