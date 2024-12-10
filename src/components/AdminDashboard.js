import React from 'react';

function AdminDashboard({ messages, users, clearMessages }) {
    const userPairs = users
        .filter((user) => user !== 'Admin' && user !== 'Group Chat')
        .flatMap((user, index, array) =>
            array.slice(index + 1).map((otherUser) => [user, otherUser])
        );

    return (
        <div
            style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                overflowY: 'auto',
                height: '100%',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px', fontSize: '24px' }}>
                Správcovský panel
            </h2>
            <button
                onClick={clearMessages}
                style={{
                    display: 'block',
                    margin: '0 auto 20px auto',
                    padding: '10px 20px',
                    backgroundColor: '#d6336c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#a82453')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#d6336c')}
            >
                Vymazať všetky správy
            </button>
            {userPairs.map(([user1, user2], index) => (
                <div
                    key={index}
                    style={{
                        marginBottom: '20px',
                        padding: '15px',
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'box-shadow 0.3s ease',
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)')
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.1)')
                    }
                >
                    <h3 style={{ marginBottom: '10px', color: '#555', fontSize: '18px' }}>
                        Chat: {user1} &amp; {user2}
                    </h3>
                    <div
                        style={{
                            maxHeight: '200px',
                            overflowY: 'auto',
                            paddingRight: '10px',
                        }}
                    >
                        <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                            {messages
                                .filter(
                                    (msg) =>
                                        (msg.user === user1 && msg.chatWith === user2) ||
                                        (msg.user === user2 && msg.chatWith === user1)
                                )
                                .map((msg, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            padding: '10px',
                                            marginBottom: '5px',
                                            borderRadius: '8px',
                                            backgroundColor:
                                                msg.user === user1 ? '#ff758c' : '#758cff',
                                            color: '#ffffff',
                                            textAlign:
                                                msg.user === user1 ? 'left' : 'right',
                                            fontSize: '14px',
                                            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <b>{msg.user}:</b> {msg.text}
                                    </li>
                                ))}
                        </ul>
                    </div>
                    {messages.filter(
                        (msg) =>
                            (msg.user === user1 && msg.chatWith === user2) ||
                            (msg.user === user2 && msg.chatWith === user1)
                    ).length === 0 && (
                        <p style={{ color: '#aaa', textAlign: 'center', margin: '10px 0' }}>
                            Zatiaľ žiadne správy.
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default AdminDashboard;