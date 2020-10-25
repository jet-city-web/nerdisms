import { useState } from 'react';
import Head from 'next/head'
import { useForm } from "react-hook-form";
import { If, Then, Else } from 'react-if';
import axios from 'axios';

export default function Contact() {

  const [message, setMessage] = useState(null);
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async (data) => {
    const response = await axios.post('/api/email', data);
    setMessage(response.data);
  }

  return (
    <>
      <Head>
        <title>Nerdisms: Contact Us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Nerdisms: Contact Us</h1>

        <If condition={!!message}>
          <Then>
            <div>{message}</div>
          </Then>
          <Else>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}

              <label>
                <input type="text" name="name" ref={register} required={true} />
                <span>Your Full Name</span>
              </label>

              <label>
                <input type="email" name="email" ref={register} required={true} />
                <span>Email Address</span>
              </label>

              <label>
                <span>Comments / Message</span>
                <textarea name="message" ref={register} required={true} />
              </label>

              <button type="submit">Send Your Comments</button>
            </form>
          </Else>
        </If>

      </main>
    </>

  )
}
