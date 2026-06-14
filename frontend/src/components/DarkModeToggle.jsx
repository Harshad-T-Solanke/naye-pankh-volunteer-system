import { useDarkMode } from '../context/DarkModeContext';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <span className="text-yellow-400">☀️</span>
      ) : (
        <span className="text-gray-700">🌙</span>
      )}
    </button>
  );
};

export default DarkModeToggle;