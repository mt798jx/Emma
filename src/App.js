import React, { useState, useEffect } from 'react';
import { ref, push, onValue, remove } from 'firebase/database';
import { database } from './firebase'; // Import Firebase konfigurácie
import Header from './components/Header';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import LoginPage from "./components/LoginPage";

function App() {
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [activeChat, setActiveChat] = useState('Miro');

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
            chatWith: activeChat,
        });
    }

    function handleLogin(user) {
        setCurrentUser(user);
    }

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
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f1f1f1', fontFamily: 'Arial, sans-serif' }}>
            <div
                style={{
                    width: '25%',
                    backgroundColor: '#fff',
                    borderRight: '1px solid #ddd',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Header />
                <div style={{padding: '20px'}}>
                    <h3 style={{color: '#555', marginBottom: '20px', textAlign: 'center', fontSize: '20px'}}>
                        Kontakty
                    </h3>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                        <div
                            onClick={() => setActiveChat('Miro')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '10px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                backgroundColor: activeChat === 'Miro' ? '#007bff' : '#f9f9f9',
                                color: activeChat === 'Miro' ? '#fff' : '#555',
                                boxShadow: activeChat === 'Miro' ? '0px 4px 10px rgba(0, 123, 255, 0.3)' : '0px 2px 5px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: '#007bff',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#fff',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                M
                            </div>
                            <div style={{flex: '1'}}>
                                <p style={{margin: '0', fontWeight: 'bold'}}>Miro</p>
                                <p style={{margin: '0', fontSize: '12px', color: '#aaa'}}>
                                    {activeChat === 'Miro' ? 'Aktívny' : 'Offline'}
                                </p>
                            </div>
                        </div>

                        <div
                            onClick={() => setActiveChat('Emma')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '10px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                backgroundColor: activeChat === 'Emma' ? '#ff758c' : '#f9f9f9',
                                color: activeChat === 'Emma' ? '#fff' : '#555',
                                boxShadow: activeChat === 'Emma' ? '0px 4px 10px rgba(255, 117, 140, 0.3)' : '0px 2px 5px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: '#ff758c',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#fff',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                E
                            </div>
                            <div style={{flex: '1'}}>
                                <p style={{margin: '0', fontWeight: 'bold'}}>Emma</p>
                                <p style={{margin: '0', fontSize: '12px', color: '#aaa'}}>
                                    {activeChat === 'Emma' ? 'Aktívna' : 'Offline'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {currentUser === 'Admin' && (
                    <button
                        onClick={clearMessages}
                        style={{
                            padding: '10px',
                            margin: '20px',
                            backgroundColor: '#d6336c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Vymazať všetky správy
                    </button>
                )}
            </div>

            {/* Pravý panel */}
            <div style={{width: '75%', display: 'flex', flexDirection: 'column'}}>
                <div style={{flex: 1, overflowY: 'auto', padding: '20px'}}>
                    <MessageList
                        messages={messages.filter(
                            (msg) =>
                                (msg.user === currentUser && msg.chatWith === activeChat) ||
                                (msg.user === activeChat && msg.chatWith === currentUser)
                        )}
                    />
                </div>
                <MessageForm addMessage={addMessage}/>
            </div>
        </div>
    );
}

export default App;