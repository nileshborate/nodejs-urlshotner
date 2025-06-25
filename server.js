import express from 'express';
import mongoose from 'mongoose';
import { getOriginalUrl, shortUrl } from './Controllers/url.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

const url = 'mongodb://localhost:27017/';
mongoose
  .connect(url, {
    dbName: 'June2025-FullStack',
  })
  .then(() => console.log('MongoDB Connected.....'))
  .catch((err) => console.log('Error :', err));

//rendering ejs file
app.get('/', (req, res) => {
  res.render('index.ejs', { shortUrl: null });
});

//shortning url - to save url into database
app.post('/short', shortUrl);

//redirect to original url
app.get('/:shortCode', getOriginalUrl);

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
