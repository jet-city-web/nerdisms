import Link from 'next/link'

export default function Contact() {

  return (
    <div className="social">
      <h2>Connect with us!</h2>
      <ul>
        <li>
          <span><img src="/assets/instagram.png" alt="Instagram" className="social-icon" /></span>
          <span><a href="https://www.instagram.com/nerd1sms/" target="_blank">Instagram</a></span>
          <span>@nerd1sms</span>
        </li>
        <li>
          <span><img src="/assets/twitter.png" alt="Twitter" className="social-icon" /></span>
          <span><a href="https://twitter.com/nerd1sms" target="_blank">Twitter</a></span>
          <span>@nerd1sms</span>
        </li>
        <li>
          <span><img src="/assets/facebook.png" alt="FaceBook" className="social-icon" /></span>
          <span><a href="https://www.facebook.com/nerdisms" target="_blank">Facebook</a></span>
          <span>/nerdisms</span>
        </li>
        <li>
          <span><img src="/assets/email.png" alt="Email" className="social-icon" /></span>
          <span><Link href="/contact">e-Mail</Link></span>
        </li>
      </ul>
    </div>
  )

}
