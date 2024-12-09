import React, { useState } from 'react';
import emmaImage from '../assets/emma.jpg';
import miroImage from '../assets/miro.jpg';

function LoginPage({ onLogin }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const users = {
        emma: { name: 'Emma', image: emmaImage, password: 'emma' },
        miro: { name: 'Miro', image: miroImage, password: 'miro' },
        admin: { name: 'Admin', password: 'admin' },
    };

    const handleLogin = () => {
        if (selectedUser && password === users[selectedUser].password) {
            onLogin(users[selectedUser].name);
        } else {
            setError('Nesprávne heslo. Skúste znova.');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f9f7f6',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h1 style={{ color: '#333', marginBottom: '20px' }}>Prihlásenie</h1>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '40px',
                    marginBottom: '30px',
                }}
            >
                {Object.keys(users).map((userKey) => (
                    <div
                        key={userKey}
                        onClick={() => setSelectedUser(userKey)}
                        style={{
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            transform: selectedUser === userKey ? 'scale(1.1)' : 'scale(1)',
                        }}
                    >
                        {userKey === 'admin' ? (
                            <div
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    backgroundColor: '#555',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    border: selectedUser === 'admin' ? '4px solid #d6336c' : '4px solid transparent',
                                }}
                            >
                                Admin
                            </div>
                        ) : (
                            <img
                                src={users[userKey].image}
                                alt={users[userKey].name}
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    objectFit: 'cover',
                                    border: selectedUser === userKey ? '4px solid #d6336c' : '4px solid transparent',
                                }}
                            />
                        )}
                        <p style={{ marginTop: '10px', fontSize: '18px', color: '#555' }}>{users[userKey].name}</p>
                    </div>
                ))}
            </div>
            {selectedUser && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        width: '100%',
                        maxWidth: '400px',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <p style={{ marginBottom: '10px', color: '#555' }}>
                        Zadajte heslo pre <strong>{users[selectedUser].name}</strong>:
                    </p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Zadajte heslo"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                            boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    <button
                        onClick={handleLogin}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#d6336c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '10px',
                            transition: 'background-color 0.2s',
                        }}
                    >
                        Prihlásiť sa
                    </button>
                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                </div>
            )}
        </div>
    );
}

export default LoginPage;