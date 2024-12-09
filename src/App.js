import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import ImageSection from './components/ImageSection';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import LoginPage from './components/LoginPage';
import image from './assets/image.jpg';

function App() {
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('messages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [currentUser, setCurrentUser] = useState(null);

    function addMessage(newMessage) {
        const updatedMessages = [
            ...messages,
            { text: newMessage, user: currentUser },
        ];
        setMessages(updatedMessages);
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
    }

    function handleLogin(user) {
        setCurrentUser(user);
    }

    function handleLogout() {
        setCurrentUser(null);
    }

    function clearMessages() {
        setMessages([]);
        localStorage.removeItem('messages');
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const savedMessages = localStorage.getItem('messages');
            if (savedMessages) {
                const parsedMessages = JSON.parse(savedMessages);
                if (JSON.stringify(parsedMessages) !== JSON.stringify(messages)) {
                    setMessages(parsedMessages);
                }
            }
        }, 500);

        return () => clearInterval(interval);
    }, [messages]);

    if (!currentUser) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <div>
            <Header />
            <ImageSection image={image} />
            <p style={{ textAlign: 'center' }}>
                Prihlásený ako: <b>{currentUser}</b>
                <button
                    onClick={handleLogout}
                    style={{
                        marginLeft: '10px',
                        padding: '5px 10px',
                        backgroundColor: '#555',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Odhlásiť sa
                </button>
            </p>
            {currentUser === 'Admin' && (
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <button
                        onClick={clearMessages}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#d6336c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Vymazať všetky správy
                    </button>
                </div>
            )}
            <MessageForm addMessage={addMessage} />
            <MessageList messages={messages} />
        </div>
    );
}

export default App;
