export default function StoryCard({ story }) {
  // Show first 300 characters with ellipsis
  const preview = story.text.length > 300 
    ? story.text.substring(0, 300) + '......' 
    : story.text;
  
  return (
    <div className="story-card">
      <h3>{story.title}</h3>
      <p className="story-preview">{preview}</p>
    </div>
  );
}
