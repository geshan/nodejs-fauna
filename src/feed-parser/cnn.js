const parser = require('./parser');

async function run() {
  return await parser.process('http://rss.cnn.com/rss/edition.rss', 'CNN');
}

module.exports = {
  run,
};
