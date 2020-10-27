import { useState } from 'react';
import Head from 'next/head'
import { useForm } from "react-hook-form";
import { If, Then, Else } from 'react-if';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

import Ism from '../components/ism.js';

export default function Contact() {

  const [ism, setIsm] = useState(undefined);
  const { register, handleSubmit, watch, errors } = useForm();
  const recaptchaRef = React.useRef();

  const onSubmit = async (data) => {
    const recaptchaValue = await recaptchaRef.current.getValue();
    if (recaptchaValue) {
      data.subject = "Nerdisms Submission";
      const response = await axios.post('/api/email', data);
      setIsm(data);
    }
  }

  return (
    <>
      <Head>
        <title>Nerdisms: Add an 'ism</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        <header>
          <img className="page-header-baldy" src="/assets/baldy-sm-glasses.png" />
          <h1>Nerdisms: Add your 'ism here...</h1>
        </header>

        <p>
          Got a great inside joke, meme, or something only other nerds will find funny? Send it in, and we'll evaluate it for possible addition to the Nerdisms gallery. If you provide it, we'll add attribution, and if it gets enough votes, it might even make a t-shirt! Note that every `ism submitted must be free for both commercial and non-commercial use. If it's not open sourced, or you don't have a license to share it, please don't.
        </p>

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
