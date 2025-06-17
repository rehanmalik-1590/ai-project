import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const ChatComponent = ({ triggerGlitch }) => {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const askAI = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    const userMessage = { text: prompt, sender: 'user' };
    setChatHistory(prev => [...prev, userMessage]);
    
    try {
      const response = await fetch(`http://localhost:8080/ask-ai?prompt=${encodeURIComponent(prompt)}`);
      const data = await response.text();
      setChatHistory(prev => [...prev, { text: data, sender: 'ai' }]);
      triggerGlitch();
    } catch (error) {
      console.error("Error generating response:", error);
      setChatHistory(prev => [...prev, { 
        text: "SYSTEM ERROR: Connection to neural network failed. Please try again.", 
        sender: 'system' 
      }]);
      triggerGlitch();
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="terminal-window h-96 overflow-y-auto p-4 space-y-4">
        <div className="terminal-header flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="text-xs text-gray-400 ml-2">malik-chat-terminal</div>
        </div>
        
        {chatHistory.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-cyan-400 mb-2">MALIK-AI CHAT INTERFACE</div>
              <div className="text-gray-400 text-sm">[SYSTEM READY] Type your query to begin neural processing</div>
            </div>
          </div>
        )}
        
        {chatHistory.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3/4 rounded-lg p-3 ${message.sender === 'user' 
              ? 'bg-cyan-900/30 border border-cyan-400/20 text-cyan-100' 
              : message.sender === 'ai'
                ? 'bg-purple-900/30 border border-purple-400/20 text-purple-100'
                : 'bg-red-900/30 border border-red-400/20 text-red-100'}`}>
              {message.sender === 'user' && (
                <div className="text-xs text-cyan-400 mb-1">USER INPUT</div>
              )}
              {message.sender === 'ai' && (
                <div className="text-xs text-purple-400 mb-1">MALIK RESPONSE</div>
              )}
              {message.sender === 'system' && (
                <div className="text-xs text-red-400 mb-1">SYSTEM ALERT</div>
              )}
              <p className="whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800/50 border border-gray-700 text-gray-300 rounded-lg p-3">
              <div className="flex space-x-2 items-center">
                <div className="text-xs text-cyan-400">PROCESSING</div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter neural query..."
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 rounded-lg text-gray-200 placeholder-gray-500 transition-all duration-300"
            onKeyPress={(e) => e.key === 'Enter' && askAI()}
          />
          <div className="absolute right-3 top-3 text-xs text-gray-500">
            {prompt.length}/500
          </div>
        </div>
        <button
          onClick={askAI}
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg disabled:opacity-50 flex items-center space-x-2 transition-all duration-300 group"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <span>PROCESSING</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>EXECUTE</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;