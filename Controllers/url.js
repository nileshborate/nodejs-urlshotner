import shortid from 'shortid';
import { Url } from '../Models/Url.js';

export const shortUrl = async (req, res) => {
  const longUrl = req.body.longUrl;
  const shortCode = shortid.generate();

  console.log('longurl = ', longUrl);
  console.log('shortcode = ', shortCode);
  const shortUrl = `http://localhost:3000/${shortCode}`;

  //save to database
  const newUrl = new Url({ shortCode, longUrl });
  await newUrl.save();

  console.log('Short Url Saved = ', newUrl);

  res.render('index.ejs', { shortUrl });
};

export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;

  //find code into database
  const originalUrl = await Url.findOne({ shortCode });

  if (originalUrl) {
    res.redirect(originalUrl.longUrl);
  } else {
    res.json({ message: 'Invalid ShortCode' });
  }
};
