import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageSection from './components/ImageSection';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import image from './assets/image.jpg';

function App() {
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('messages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });

    function addMessage(newMessage) {
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
    }

    useEffect(() => {
        const savedMessages = localStorage.getItem('messages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    return (
        <div>
            <Header />
            <ImageSection image={image} />
            <MessageForm addMessage={addMessage} />
            <MessageList messages={messages} />
        </div>
    );
}

export default App;