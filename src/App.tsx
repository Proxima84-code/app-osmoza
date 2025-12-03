'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Response } from '@/components/ai-elements/response';

export default function Page() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState('');

  return (
    <>
      {messages.map(message => (
        <div key={message.id}>
          {message.parts.filter(part => part.type === 'text').map((part, index) => (
            <Response isAnimating={status === 'streaming'} key={index}>{part.text}</Response>
          ))}
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Say something..."
        />
        <button type="submit" disabled={status !== 'ready'}>
          Submit
        </button>
      </form>
    </>
  );
}
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import EbookStore from './components/EbookStore';
import OnlineFans from './components/OnlineFans';
import FacebookPanel from './components/FacebookPanel';
import InstagramPanel from './components/InstagramPanel';

function App() {
  return (
    <>
      <nav style={{ display: 'flex', gap: '20px', padding: '10px' }}>
        <Link to="/">Start</Link>
        <Link to="/ebooki">E-booki</Link>
        <Link to="/onlinefans">OnlineFans</Link>
        <Link to="/facebook">Facebook</Link>
        <Link to="/instagram">Instagram</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ebooki" element={<EbookStore />} />
        <Route path="/onlinefans" element={<OnlineFans />} />
        <Route path="/facebook" element={<FacebookPanel />} />
        <Route path="/instagram" element={<InstagramPanel />} />
      </Routes>
    </>
  );
}

export default App;
