import React, { useState } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

async function fetchMessage(input) {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: input}],
            max_tokens: 100,
        })
    }
    const response = await fetch('https://api.openai.com/v1/chat/completions', options)
    const data = await response.json();
    return data.choices[0].message.content;
}

function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [history, setHistory] = useState([]);

    const handleSubmit = async () => {
        const message = await fetchMessage(input);
        setOutput(message);
        setHistory([input, ...history]);
        setInput('');
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
    };

    const handleHistoryClick = (value) => {
        setInput(value);
    };

    return (
        <div className="App">
          <div className="side-bar">
            <button onClick={handleClear}>New Chat</button>
            <div className="history">
              {history.map((item, index) => (
                <p key={index} onClick={() => handleHistoryClick(item)}>{item}</p>
              ))}
            </div>
            <nav>
              <p>Made by Kutay</p>
            </nav>
          </div>
    
          <div className="main-content">
            <h1>ChatGPT Clone</h1>
            <p id="output">{output}</p>
            <div className="bottom-section">
              <div className="input-container">
                <input value={input} onChange={(e) => setInput(e.target.value)} />
                <button id="submit" onClick={handleSubmit}>&#10146;</button>
              </div>
              <p className="info">
                Chat GPT Mar 14 Version. Free Research Preview. 
                Our goal is to make AI systems more natural and safe to interact with.
                Your feedback will help us improve our models and build better AI products.
              </p>
            </div>
          </div>
        </div>
      );
}

export default App;
