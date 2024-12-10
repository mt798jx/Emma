import React, { useState, useRef, useEffect } from 'react';
import emmaImage from '../assets/emma.jpg';
import miroImage from '../assets/miro.jpg';
import laraImage from '../assets/lara.jpg';
import martinImage from '../assets/martin.jpg';

function LoginPage({ onLogin }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const passwordInputRef = useRef(null);

    const users = {
        emma: { name: 'Emma', image: emmaImage, password: 'emma', color: '#d6336c' }, // Ružová
        miro: { name: 'Miro', image: miroImage, password: 'miro', color: '#007bff' }, // Modrá
        lara: { name: 'Lara', image: laraImage, password: 'lara', color: '#ff8800' }, // Oranžová
        martin: { name: 'Martin', image: martinImage, password: 'martin', color: '#32cd32' }, // Zelená
        admin: { name: 'Admin', password: 'admin', color: '#333' }, // Šedá
    };

    const handleLogin = () => {
        if (selectedUser && password === users[selectedUser].password) {
            onLogin(users[selectedUser].name);
        } else {
            setError('Nesprávne heslo. Skúste znova.');
        }
    };

    const handleOutsideClick = (e) => {
        if (!e.target.closest('.login-box') && !e.target.closest('.user-avatar')) {
            setSelectedUser(null);
            setPassword('');
            setError('');
        }
    };

    const handleUserSelection = (userKey) => {
        setSelectedUser(userKey);
        setPassword('');
        setError('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const selectedColor = selectedUser ? users[selectedUser].color : '#121212';

    useEffect(() => {
        if (selectedUser && passwordInputRef.current) {
            passwordInputRef.current.focus();
        }
    }, [selectedUser]);

    return (
        <div
            onClick={handleOutsideClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: selectedColor,
                fontFamily: 'Arial, sans-serif',
                color: '#ffffff',
                padding: '20px',
                transition: 'background-color 0.5s ease',
                position: 'relative',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '40px',
                    marginBottom: '30px',
                }}
            >
                {Object.keys(users).map((userKey) => (
                    <div
                        key={userKey}
                        className="user-avatar"
                        onClick={() => handleUserSelection(userKey)}
                        style={{
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            transform: selectedUser === userKey ? 'scale(1.1)' : 'scale(1)',
                            boxShadow:
                                selectedUser === userKey
                                    ? `0px 10px 20px ${users[userKey].color}`
                                    : '0px 5px 15px rgba(0, 0, 0, 0.5)',
                            borderRadius: '50%',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = `0px 10px 20px ${users[userKey].color}`;
                        }}
                        onMouseOut={(e) => {
                            if (selectedUser !== userKey) {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0px 5px 15px rgba(0, 0, 0, 0.5)';
                            }
                        }}
                    >
                        {userKey === 'admin' ? (
                            <div
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    backgroundColor: '#333',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ffffff',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
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
                                    objectFit: 'cover',
                                    border: selectedUser === userKey ? `3px solid ${users[userKey].color}` : '3px solid transparent',
                                }}
                            />
                        )}
                        <p style={{ marginTop: '10px', fontSize: '18px', color: '#ffffff' }}>{users[userKey].name}</p>
                    </div>
                ))}
            </div>
            {selectedUser && (
                <div
                    className="login-box"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '15px',
                        width: '100%',
                        maxWidth: '400px',
                        padding: '20px',
                        backgroundColor: '#1f1f1f',
                        borderRadius: '10px',
                        boxShadow: `0px 10px 20px ${selectedColor}`,
                        zIndex: 1,
                    }}
                >
                    <p style={{ marginBottom: '10px', fontSize: '16px', color: '#bbbbbb' }}>
                        Zadajte heslo pre <strong style={{ color: '#ffffff' }}>{users[selectedUser].name}</strong>:
                    </p>
                    <input
                        type="password"
                        value={password}
                        ref={passwordInputRef}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Zadajte heslo"
                        onKeyDown={handleKeyDown}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '5px',
                            border: 'none',
                            fontSize: '16px',
                            backgroundColor: '#333',
                            color: '#ffffff',
                            boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.5)',
                        }}
                    />
                    <button
                        onClick={handleLogin}
                        style={{
                            padding: '12px 20px',
                            backgroundColor: selectedColor,
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'background-color 0.3s, transform 0.3s',
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#ffffff';
                            e.target.style.color = selectedColor;
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = selectedColor;
                            e.target.style.color = 'white';
                            e.target.style.transform = 'scale(1)';
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