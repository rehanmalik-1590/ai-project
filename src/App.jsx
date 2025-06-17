import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ChatComponent from './components/ChatComponent';
import ImageGenerator from './components/ImageGenerator';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import ThemeToggle from './components/ThemeToggle';
import HolographicHeader from './components/HolographicHeader';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [glitchEffect, setGlitchEffect] = useState(false);

  const triggerGlitch = () => {
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 500);
  };

  return (
    <ThemeProvider>
      <div className={`min-h-screen bg-gray-950 text-gray-100 font-mono ${glitchEffect ? 'glitch-effect' : ''}`}>
        {/* Holographic UI Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 bg-radial-gradient opacity-5"></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10 max-w-7xl">
          <HolographicHeader activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main className="mt-8 bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
            <div className="p-6">
              {activeTab === 'chat' && <ChatComponent triggerGlitch={triggerGlitch} />}
              {activeTab === 'image' && <ImageGenerator triggerGlitch={triggerGlitch} />}
              {activeTab === 'resume' && <ResumeAnalyzer triggerGlitch={triggerGlitch} />}
            </div>
          </main>

          <footer className="mt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} REHAN MALIK ML-ENGINEER</p>
            <p className="text-xs mt-1 text-gray-600">SYSTEM STATUS: ONLINE</p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;