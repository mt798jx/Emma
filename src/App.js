import React, { useState, useEffect } from 'react';
import { ref, push, onValue, remove } from 'firebase/database';
import { database } from './firebase'; // Import Firebase konfigurácie
import Header from './components/Header';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';

function App() {
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [activeChat, setActiveChat] = useState('Group Chat'); // Predvolene skupinový chat
    const [users] = useState(['Emma', 'Miro', 'Lara', 'Martin', 'Group Chat']); // Zoznam používateľov
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
    const [showChatList, setShowChatList] = useState(!isMobile);

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

    // Aktualizácia stavu pri zmene veľkosti okna
    useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth <= 700;
            setIsMobile(isMobileView);
            if (!isMobileView) {
                setShowChatList(true); // Vždy zobraz zoznam kontaktov na desktopoch
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

    if (currentUser === 'Admin') {
        return (
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f1f1f1' }}>
                <Header />
                <button
                    onClick={handleLogout}
                    style={{
                        margin: '20px auto',
                        padding: '10px 20px',
                        backgroundColor: '#555',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Odhlásiť sa
                </button>
                <div style={{ flex: 1, padding: '20px' }}>
                    <AdminDashboard messages={messages} users={users} clearMessages={clearMessages} />
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f1f1f1', fontFamily: 'Arial, sans-serif' }}>
            {/* Zoznam kontaktov alebo chat podľa režimu */}
            {(!isMobile || showChatList) && (
                <div
                    style={{
                        width: isMobile ? '100%' : '25%',
                        backgroundColor: '#fff',
                        borderRight: isMobile ? 'none' : '1px solid #ddd',
                        display: 'flex',
                        flexDirection: 'column',
                        position: isMobile ? 'absolute' : 'static',
                        zIndex: 10,
                        height: '100%',
                    }}
                >
                    <Header />
                    <div style={{ padding: '20px' }}>
                        <h3 style={{ color: '#555', marginBottom: '20px', textAlign: 'center', fontSize: '20px' }}>
                            Kontakty
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {users.map((user) => (
                                <div
                                    key={user}
                                    onClick={() => {
                                        setActiveChat(user);
                                        setShowChatList(false);
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        backgroundColor: activeChat === user ? '#007bff' : '#f9f9f9',
                                        color: activeChat === user ? '#fff' : '#555',
                                        boxShadow: activeChat === user
                                            ? '0px 4px 10px rgba(0, 123, 255, 0.3)'
                                            : '0px 2px 5px rgba(0, 0, 0, 0.1)',
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
                                        {user.charAt(0)}
                                    </div>
                                    <div style={{ flex: '1' }}>
                                        <p style={{ margin: '0', fontWeight: 'bold' }}>{user}</p>
                                        <p style={{ margin: '0', fontSize: '12px', color: '#aaa' }}>
                                            {activeChat === user ? 'Aktívny' : 'Offline'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '10px',
                            margin: '20px',
                            backgroundColor: '#555',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Odhlásiť sa
                    </button>
                </div>
            )}

            {(!isMobile || !showChatList) && (
                <div
                    style={{
                        width: isMobile ? '100%' : '75%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: isMobile ? 'absolute' : 'static',
                        zIndex: 1,
                        height: '100%',
                    }}
                >
                    {isMobile && (
                        <button
                            onClick={() => setShowChatList(true)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                margin: '10px',
                            }}
                        >
                            Späť na kontakty
                        </button>
                    )}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                        <MessageList
                            currentUser={currentUser}
                            messages={messages.filter((msg) =>
                                activeChat === 'Group Chat'
                                    ? msg.chatWith === 'Group Chat'
                                    : (msg.user === currentUser && msg.chatWith === activeChat) ||
                                    (msg.user === activeChat && msg.chatWith === currentUser)
                            )}
                        />
                    </div>
                    <MessageForm addMessage={addMessage} />
                </div>
            )}
        </div>
    );
}

export default App;