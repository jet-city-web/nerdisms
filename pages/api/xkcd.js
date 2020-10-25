import axios from 'axios';

export default async function handler(req, res) {
  const url = 'https://xkcd.com/info.0.json';
  const response = await axios.get(url);
  const image = response.data.img;
  res.setHeader('Content-Type', 'text/plain')
  res.end(image);
}
