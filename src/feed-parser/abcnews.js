const parser = require('./parser');

async function run() {
  return await parser.process('https://abcnews.go.com/abcnews/topstories', 'ABC News');
}

module.exports = {
  run,
};
