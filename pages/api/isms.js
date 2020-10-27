import sendEmail from '../../lib/email.js';

const list = {
  "Devs": [
    {
      text: "!false",
      contributor: 'baldy',
      source: 'Code Fellows',
      upvotes: 5,
      downvotes: 1,
    },
    {
      text: "fear { display:none; }",
      contributor: 'baldy',
      source: 'CSS Puns',
      upvotes: 23,
      downvotes: 5,
    },
    {
      text: "['hip','hip']",
      contributor: 'Nicholas Carignan',
      source: 'unknown',
      upvotes: 23,
      downvotes: 5,
    },
    {
      text: "/* no comment */",
      contributor: 'Sarah Fisher',
      source: 'meme',
      upvotes: 23,
      downvotes: 5,
    },
    {
      text: "white space matters",
      contributor: 'baldy',
      source: 'CSS Puns',
      upvotes: 23,
      downvotes: 5,
    }
  ],
  // https://www.pinterest.com/teebanger0132/gamers-sayings/
  "Gamers": [
    {
      text: "I wouldn't say video games have made me violent, but I feel like I'm supposed to pick this up (pipe pic)",
      contributor: 'baldy',
      source: 'CSS Puns',
      upvotes: 23,
      downvotes: 5,
    },
    {
      text: "Gamers don't die, we respawn",
      contributor: 'baldy',
      source: 'CSS Puns',
      upvotes: 23,
      downvotes: 5,
    },
  ],
  "Mathletes": [
    {
      text: "Happy Pi Day",
      contributor: 'baldy',
      source: 'CSS Puns',
      upvotes: 23,
      downvotes: 5,
    },
    {
      text: "5/4 be with you",
      contributor: 'baldy',
      source: 'CSS Puns',
      upvotes: 23,
      downvotes: 5,
    },
    {
      text: "Merry Halloween",
      contributor: 'baldy',
      source: 'CSS Puns',
      upvotes: 23,
      downvotes: 5,
    },
  ]
};

export default async function handler(req, res) {

  const { method } = req;

  switch (method) {
    case 'GET':
      const list = await read();
      res.status(200).json(list);
      break
    case 'POST':
      const ism = await create(req.body);
      res.status(200).json(ism);
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}

export async function read() {
  return list;
}

async function create(data) {
  let ism = new Ism(data);
  // Send an email to the contributor
  // sendEmail(process.env.NEXT_PUBLIC_ADMIN_EMAIL, ism.email, 'Nerdisms Submission', ism)
  return ism;
}

function Ism(data) {
  this.text = data.text;
  this.contributor = data.contributor || 'Anonymous';
  this.email = data.email || 'Not Provided';
  this.source = data.source || 'Not Provided';
  this.upvotes = 0;
  this.downvotes = 0;
}
