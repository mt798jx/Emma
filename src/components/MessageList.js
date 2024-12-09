import React from 'react';

function MessageList({ messages }) {
    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h2 style={{ color: '#d6336c' }}>Správy</h2>
            {messages.length === 0 ? (
                <p style={{ color: '#555' }}>Zatiaľ tu nie sú žiadne správy.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {messages.map((msg, index) => (
                        <li
                            key={index}
                            style={{
                                backgroundColor: msg.user === 'Emma' ? '#ffcccb' : '#cce5ff',
                                margin: '10px auto',
                                padding: '10px',
                                borderRadius: '5px',
                                maxWidth: '500px',
                                textAlign: 'left',
                            }}
                        >
                            <b>{msg.user}:</b> {msg.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MessageList;