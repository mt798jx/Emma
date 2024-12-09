import React, { useState } from 'react';

function MessageForm({ addMessage }) {
    const [message, setMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (message.trim()) {
            addMessage(message);
            setMessage('');
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ textAlign: 'center', margin: '20px' }}>
      <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Napíš niečo pekné..."
          style={{
              width: '80%',
              height: '100px',
              borderRadius: '10px',
              padding: '10px',
              border: '1px solid #ccc',
          }}
      />
            <br />
            <button
                type="submit"
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
                Poslať správu
            </button>
        </form>
    );
}

export default MessageForm;