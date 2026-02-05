import { useState, useEffect } from 'react';
import StoryCard from './components/StoryCard';
import FloatingButton from './components/FloatingButton';
import Controls from './components/Controls';
import PostModal from './components/PostModal';
import storiesData from './data/stories.json';

function App() {
  const [stories, setStories] = useState(storiesData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Fun random tips
  const funTips = [
    "💡 Pro tip: Stories are best read with snacks",
    "🎭 Plot twist: You're the main character now",
    "✨ Reading increases your imagination by 420%*",
    "🎪 *Statistics may or may not be made up",
    "🧙‍♂️ Every story makes you 0.001% wiser",
    "🎨 Dark mode makes you look mysterious",
    "📖 Warning: May contain feelings and stuff",
    "🤷‍♂️ The narrator is winging it, honestly",
    "💭 These stories are 73% improvised",
    "🎬 No narrators were harmed in the making of this site",
    "⚠️ Side effects include: emotions, laughter, confusion",
    "🎯 Quality not guaranteed, entertainment probable",
  ];
  const [currentTip, setCurrentTip] = useState(funTips[Math.floor(Math.random() * funTips.length)]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(funTips[Math.floor(Math.random() * funTips.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAddStory = (newStory) => {
    const story = {
      id: stories.length + 1,
      ...newStory
    };
    setStories([story, ...stories]);
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGrid = () => {
    setSelectedStory(null);
  };

  // Story Detail View
  if (selectedStory) {
    return (
      <>
        <div className="story-detail">
          <button className="back-button" onClick={handleBackToGrid}>
            ← Back to the Chaos
          </button>
          <div className="story-detail-content">
            <h1 className="story-detail-title">{selectedStory.title}</h1>
            <p className="story-detail-text">{selectedStory.text}</p>
          </div>
        </div>
        <Controls isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />
      </>
    );
  }

  return (
    <>
      <div className="header">
        <div className="narrator-badge">🆘 SOS</div>
        <h1>🎭 Narrator Needs Help!</h1>
        <p className="subtitle">Please lower your expectations.</p>
        <p className="fun-tip">{currentTip}</p>
      </div>

      {stories.length === 0 ? (
        <div className="work-in-progress">
          <div className="work-in-progress-icon">📝</div>
          <h2>The Narrator is Taking a Coffee Break ☕</h2>
          <p>No stories yet... probably lost the script again 🤦‍♂️</p>
          <p className="sub-message">Click the magic pencil below to save the day! 🦸‍♀️</p>
        </div>
      ) : (
        <div className="story-grid">
          {stories.map((story) => (
            <div key={story.id} onClick={() => handleStoryClick(story)}>
              <StoryCard story={story} />
            </div>
          ))}
        </div>
      )}

      <Controls isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />
      <FloatingButton onClick={() => setIsModalOpen(true)} />
      <PostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStory}
      />
    </>
  );
}

export default App;
