import React, { useState } from 'react';
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

    if (!currentUser) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <div>
            <Header />
            <ImageSection image={image} />
            <p style={{ textAlign: 'center' }}>Prihlásený ako: <b>{currentUser}</b></p>
            <MessageForm addMessage={addMessage} />
            <MessageList messages={messages} />
        </div>
    );
}

export default App;
