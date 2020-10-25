import { useState } from 'react';
import Head from 'next/head'
import { useForm } from "react-hook-form";
import { If, Then, Else } from 'react-if';
import axios from 'axios';

import Ism from '../components/ism.js';

export default function Contact() {

  const [ism, setIsm] = useState(undefined);
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async (data) => {
    // Send using internal API
    const response = await axios.post('/api/isms', data);
    setIsm(response.data);
  }

  return (
    <>
      <Head>
        <title>Nerdisms: Add an 'ism</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Nerdisms: Add your 'ism here...</h1>

        <If condition={ism}>
          <Then>
            <h2>Thank You</h2>
            <p>Here's a preview of your nerdism.</p>
            <p>Our content team will review this and potentially add it to the list.</p>
            <div className="preview">
              <Ism ism={ism} />
            </div>
          </Then>
          <Else>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}

              <label>
                <input type="text" name="contributor" ref={register} required={true} />
                <span>Your Full Name</span>
              </label>

              <label>
                <input type="email" name="email" ref={register} required={true} />
                <span>Email Address</span>
              </label>

              <label>
                <input type="text" name="source" ref={register} required={true} />
                <span>Where did you find or hear of this `ism?</span>
              </label>

              <label>
                <span>Type & explain your nerdism (or URL to image/meme)</span>
                <textarea name="text" ref={register} required={true} />
              </label>

              <button type="submit">Send Your Comments</button>
            </form>
          </Else>
        </If>

      </main>
    </>

  )
}
