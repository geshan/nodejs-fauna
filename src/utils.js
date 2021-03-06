const MAX_STORIES = 10;

function formatFeedStories(stories, source) {
  let formattedStories = [];
  let count = 0;
  for (story of stories) {
    formattedStories.push({ 
      headline: story.title.trim(), 
      url: story.link,
      published_date: story.pubDate,
      source });
    if (count === MAX_STORIES - 1) {
      break;
    }
    count++;
  }

  return formattedStories;
}

module.exports = {
  formatFeedStories,
};
