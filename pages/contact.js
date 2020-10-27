import { useState } from 'react';
import Head from 'next/head'
import { useForm } from "react-hook-form";
import { If, Then, Else } from 'react-if';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {

  const [message, setMessage] = useState(null);
  const { register, handleSubmit, watch, errors } = useForm();
  const recaptchaRef = React.useRef();

  const onSubmit = async (data) => {
    const recaptchaValue = await recaptchaRef.current.getValue();
    if (recaptchaValue) {
      data.subject = "Nerdisms Message";
      const response = await axios.post('/api/email', data);
      setMessage(response.data);
    }
  }

  return (
    <>
      <Head>
        <title>Nerdisms: Contact Us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        <header>
          <img className="page-header-baldy" src="/assets/baldy-sm-glasses.png" />
          <h1>Nerdisms: Contact Us</h1>
        </header>

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

              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              />

              <button type="submit">Send Your Comments</button>
            </form>
          </Else>
        </If>

      </main>
    </>

  )
}
