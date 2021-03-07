const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY
});

const COLLECTION_NAME = 'Stories';

async function insertStories(stories) {
  try {
    for(const story of stories) {
      //check first if story exists by headline (unique)
      const result = await client.query(
        q.Create(
          q.Collection(COLLECTION_NAME),
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

async function getStories(afterId) {
  const stories = await client.query (
    q.Map(
      q.Paginate(
        q.Documents(q.Collection(COLLECTION_NAME)),
        {
          size: 10,
          after: q.Ref(q.Collection(COLLECTION_NAME), afterId)
        }
      ),
      q.Lambda((x) => q.Get(x))  
    )
  );

  return stories;
}

module.exports = {
  insertStories,
  getStories
}
