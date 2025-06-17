import ThemeToggle from './ThemeToggle';

const HolographicHeader = ({ activeTab, setActiveTab }) => {
  return (
    <header className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-cyan-900/30 border border-cyan-400/30 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
          {/* <h1 className="text-3xl font-bold  text-white">
            CHAT-AI
          </h1> */}
        </div>
        <ThemeToggle />
      </div>

      <nav className="flex space-x-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
        {['chat', 'image', 'resume'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-md font-medium transition-all duration-300 flex-1 text-center relative overflow-hidden ${
              activeTab === tab
                ? 'bg-gray-800 text-cyan-400 shadow-lg'
                : 'text-gray-400 hover:text-cyan-300'
            }`}
          >
            {activeTab === tab && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-400 animate-pulse"></span>
            )}
            {tab === 'chat' && 'CHAT'}
            {tab === 'image' && 'IMAGE-GEN'}
            {tab === 'resume' && 'CV ANALYZER'}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default HolographicHeader;