export default function Controls({ isDarkMode, onToggleDarkMode }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="controls">
      <button 
        className="control-button" 
        onClick={onToggleDarkMode}
        title={isDarkMode ? '☀️ Too bright! Go back!' : '🌙 Join the dark side...'}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      <button 
        className="control-button" 
        onClick={scrollToTop}
        title="🚀 Beam me up, Scotty!"
      >
        ⬆️
      </button>
      <button 
        className="control-button" 
        onClick={scrollToBottom}
        title="🏊 Dive to the bottom!"
      >
        ⬇️
      </button>
    </div>
  );
}
