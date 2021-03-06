const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY
});

async function insertStories(stories) {
  try {
    for(const story of stories) {
      //check first if story exists by headline (unique)
      const result = await client.query(
        q.Create(
          q.Collection('Stories'),
          {data: story}
        )
      );
      console.log('Story insert was ok', result);
    }
    
    return true;
  } catch (e) {
    console.log(`Error adding story to fauna: ${e.message}`, e);
    return false;
  }
}

module.exports = {
  insertStories
}
