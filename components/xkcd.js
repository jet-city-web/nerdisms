import { useEffect, useState } from 'react';
import { When } from 'react-if';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';

export default function XKCD() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [comic, setComic] = useState('');

  function closeModal() {
    setModalIsOpen(false);
  }

  function showModal() {
    setModalIsOpen(true);
  }

  useEffect(() => {
    const getComic = async () => {
      const response = await axios.get('/api/xkcd');
      setComic(response.data);
    }
    getComic();
  }, []);

  return (
    <>
      <When condition={modalIsOpen}>
        <Modal open={modalIsOpen} onClose={closeModal} center>
          <img src={comic} alt="XKCD Comic of the day" />
        </Modal>
      </When>
      <div onClick={showModal} className="xkcd">
        <h2>XKCDOTD</h2>
        <img src={comic} alt="XKCD Comic of the day" />
      </div>
    </>
  )

}
