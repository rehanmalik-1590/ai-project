import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full p-1 bg-gray-800 border border-gray-700 focus:outline-none flex items-center"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20 transition-opacity duration-500 ${
          theme === 'dark' ? 'opacity-20' : 'opacity-0'
        }`}></div>
      </div>
      <div
        className={`relative w-6 h-6 rounded-full bg-gray-700 border border-gray-600 transform transition-transform duration-500 flex items-center justify-center ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {theme === 'dark' ? (
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
        ) : (
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;