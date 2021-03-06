const Parser = require('rss-parser');
const parser = new Parser();
const utils = require('../utils');
const faunadb = require('../db/fauna');

async function process(feedUrl, source) {
  try {
    const feed = await parser.parseURL(feedUrl);
    const formattedStories = utils.formatFeedStories(feed.items, source);
    let message = `Fetched and formatted ${formattedStories.length} stories from ${source}.`;
    const inserted = await faunadb.insertStories(formattedStories);
    message += ` Inserted ${inserted} stories into the data store.`

    return { message };
  } catch (err) {
    const errMessage = `Error while parsing feed or posting news stories for ${source}`;
    console.log(errMessage, err);

    return {message: errMessage};
  }
}

module.exports = {
  process,
};
