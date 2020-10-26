import sendEmail from '../../lib/email.js';

const list = [
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
    text: "this one is like really long and not very funny, but we'll see, I guess",
    contributor: 'baldy',
    source: 'CSS Puns',
    upvotes: 23,
    downvotes: 5,
  },
  {
    text: "white space matters",
    contributor: 'baldy',
    source: 'CSS Puns',
    upvotes: 23,
    downvotes: 5,
  },
];

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
