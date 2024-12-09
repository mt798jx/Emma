import React from 'react';

function Header() {
    return (
        <header
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                background: 'linear-gradient(90deg, #ff7eb3, #ff758c)',
                color: '#ffffff',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h1 style={{ fontSize: '36px', margin: '0', fontFamily: "'Pacifico', cursive" }}>
                Pre moju ❤️
            </h1>
            <p style={{ fontSize: '18px', marginTop: '10px', fontStyle: 'italic' }}>
                Nezabudni, že si pre mňa všetko!
            </p>
        </header>
    );
}

export default Header;