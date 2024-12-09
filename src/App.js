import React, { useState, useEffect } from 'react';
import { ref, push, onValue, remove } from 'firebase/database';
import { database } from './firebase'; // Import Firebase konfigurácie
import Header from './components/Header';
import ImageSection from './components/ImageSection';
import MessageForm from './components/MessageForm';
import MessageList from './/components/MessageList';
import LoginPage from './components/LoginPage';
import image from './assets/image.jpg';

function App() {
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    // Načítanie správ z Firebase
    useEffect(() => {
        const messagesRef = ref(database, 'messages');
        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const loadedMessages = data ? Object.values(data) : [];
            setMessages(loadedMessages);
        });

        return () => unsubscribe();
    }, []);

    // Pridanie novej správy do Firebase
    function addMessage(newMessage) {
        const messagesRef = ref(database, 'messages');
        push(messagesRef, {
            text: newMessage,
            user: currentUser,
        });
    }

    // Prihlásenie používateľa
    function handleLogin(user) {
        setCurrentUser(user);
    }

    // Odhlásenie používateľa
    function handleLogout() {
        setCurrentUser(null);
    }

    // Vymazanie všetkých správ z Firebase (iba pre admina)
    function clearMessages() {
        const messagesRef = ref(database, 'messages');
        remove(messagesRef);
    }

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