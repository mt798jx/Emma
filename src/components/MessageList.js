import React from 'react';

function MessageList({ messages, currentUser, users }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '20px',
                backgroundColor: '#f1f1f1',
                borderRadius: '10px',
                boxShadow: 'inset 0 4px 6px rgba(0, 0, 0, 0.1)',
                overflowY: 'auto',
                height: '100%',
            }}
        >
            {messages.length === 0 ? (
                <p style={{ color: '#555', textAlign: 'center' }}>Zatiaľ tu nie sú žiadne správy.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                    {messages.map((msg, index) => (
                        <li
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: msg.user === currentUser ? 'flex-end' : 'flex-start',
                                margin: '5px 0',
                                alignItems: 'center', // Zarovnanie avatara a správy
                            }}
                        >
                            {msg.user !== currentUser && (
                                <div
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        marginRight: msg.user === currentUser ? '0' : '10px',
                                        marginLeft: msg.user === currentUser ? '10px' : '0',
                                    }}
                                >
                                    <img
                                        src={users[msg.user.toLowerCase()]?.image || ''}
                                        alt={msg.user}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            )}
                            <div
                                style={{
                                    maxWidth: '60%',
                                    padding: '10px 15px',
                                    borderRadius: '15px',
                                    backgroundColor: msg.user === currentUser ? '#4CAF50' : '#2196F3',
                                    color: '#ffffff',
                                    textAlign: 'left',
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                {msg.text}
                            </div>
                            {msg.user === currentUser && (
                                <div
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        marginLeft: '10px',
                                    }}
                                >
                                    <img
                                        src={users[msg.user.toLowerCase()]?.image || ''}
                                        alt={msg.user}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MessageList;