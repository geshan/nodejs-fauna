const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cnn = require('./src/feed-parser/cnn');
const abcnews = require('./src/feed-parser/abcnews');

const sources = {
  cnn,
  abcnews
}

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
});

app.get('/pull-news/:source', async (req, res) => {
  const source = req.params.source;

  return res.json(await sources[source].run());
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
