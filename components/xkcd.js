import { useEffect, useState } from 'react';
import axios from 'axios';

export default function XKCD() {

  const [comic, setComic] = useState('');

  useEffect(() => {
    const getComic = async () => {
      const response = await axios.get('/api/xkcd');
      setComic(response.data);
    }
    getComic();
  }, []);

  return (
    <div className="xkcd">
      <h2>XKCDOTD</h2>
      <img className="xkcd" src={comic} alt="XKCD Comic of the day" />
    </div>
  )

}
