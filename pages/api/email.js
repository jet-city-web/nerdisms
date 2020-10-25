import sendEmail from '../../lib/email.js';

export default async function handler(req, res) {

  if (req.body.name, req.body.email, req.body.message) {
    try {
      await sendEmail(process.env.NEXT_PUBLIC_ADMIN_EMAIL, req.body.email, 'Nerdisms Comment', req.body);
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end("Thank You");
    } catch (e) {
      console.error(e.message);
      error('Error sending message, please try again');
    }
  } else {
    console.error('Invalid Body', req.body);
    error('Error sending message, please try again');
  }

  // Forcing a 200 instead of a 500 becaus next.js is intercepting and putting up gross dialoge errors
  function error(message) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end(message);
  }

}

