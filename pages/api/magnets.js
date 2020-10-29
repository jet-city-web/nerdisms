export default async function handler(req, res) {

  const { method } = req;

  switch (method) {
    case 'GET':
      const words = await read();
      res.status(200).json(words);
      break
    case 'PUT':
      const ism = await create(req.body);
      res.status(200).json(ism);
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}

export async function read() {
  // Needs to be from a db
  const words = require('./words.json');
  return words;
}


function save() {

}
