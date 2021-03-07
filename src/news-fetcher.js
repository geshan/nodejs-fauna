const faunadb = require('./db/fauna');

async function getStories(afterId) {
  try {
    const stories = await faunadb.getStories(afterId);
    let formattedStories = [];
    for(story of stories.data) {
      formattedStories.push({id: story.ref.id, ...story.data });
    }

    return {
      data: formattedStories,
      meta: {
        next: `/stories?afterId=${stories.after[0].id}`
      }
    };
  } catch (e) {
    console.log(e.message, e);
    return [];
  }
}

module.exports = {
  getStories
}
