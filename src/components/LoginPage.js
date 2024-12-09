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
    };

    const handleLogin = () => {
        if (selectedUser && password === users[selectedUser].password) {
            onLogin(users[selectedUser].name);
        } else {
            setError('Nesprávne heslo. Skúste znova.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Prihlásenie</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                {Object.keys(users).map((userKey) => (
                    <div key={userKey} onClick={() => setSelectedUser(userKey)}>
                        <img
                            src={users[userKey].image}
                            alt={users[userKey].name}
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                border: selectedUser === userKey ? '3px solid #d6336c' : 'none',
                            }}
                        />
                        <p>{users[userKey].name}</p>
                    </div>
                ))}
            </div>
            {selectedUser && (
                <div style={{ marginTop: '20px' }}>
                    <p>Zadajte heslo pre {users[selectedUser].name}:</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                    <br />
                    <button
                        onClick={handleLogin}
                        style={{
                            marginTop: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#d6336c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Prihlásiť sa
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
        </div>
    );
}

export default LoginPage;