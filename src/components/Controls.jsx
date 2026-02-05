import { useState } from 'react';

export default function Controls({ isDarkMode, onToggleDarkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div 
      className="controls"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`controls-menu ${isExpanded ? 'expanded' : ''}`}>
        <button 
          className="control-button" 
          onClick={onToggleDarkMode}
          title={isDarkMode ? '☀️ Light mode' : '🌙 Dark mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <button 
          className="control-button" 
          onClick={scrollToTop}
          title="🚀 Jump to top"
        >
          ⬆️
        </button>
        <button 
          className="control-button" 
          onClick={scrollToBottom}
          title="🏊 Jump to bottom"
        >
          ⬇️
        </button>
      </div>
      <div className="control-trigger">
        <span className="control-icon">⚙️</span>
      </div>
    </div>
  );
}
