import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import uuid from 'uuid/dist/v4';

const myId = uuid();
const socket = io("http://127.0.0.1:4747", { transports: ["websocket"] }); 
socket.on('connect', () => console.log('[IO] Connected 😁⚡'));

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleNewMessage = newMessage => setMessages([...messages, newMessage]);

    socket.on('chat.message', handleNewMessage);

    return () => socket.off('chat.message', handleNewMessage);

  }, [messages]);
  
  function handleInputChange (e) {
    setMessage(e.target.value);
  }

  function handleFormSubmit (e) {
    e.preventDefault();

    if (message.trim()) {
      socket.emit('chat.message', {
        id: myId,
        message
      })
      setMessage('');
    }

  }

  return (
  <main className='container'>
    <ul className='list'>
      { messages.map((m, index) => 
        <li className={`list__item list__item--${m.id === myId ? 'mine' : 'other'}`}  
            key={index}
        >
          <span className={`message message--${m.id === myId ? 'mine' : 'other'}`}>
            { m.message }
          </span>
        </li>         
        )}
    </ul>
    <form className='form' onSubmit={handleFormSubmit} >
      <input className='form__field'
             placeholder='Type a new message here'
             type='text'
             onChange={handleInputChange}
             value={message}
      />
    </form>
  </main>
)}

export default Chat;
