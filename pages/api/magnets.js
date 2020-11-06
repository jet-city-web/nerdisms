const axios = require('axios');

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
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/magnets`);
  return response?.data?.results || [];
}

export async function update(magnet) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/api/v1/magnets/${magnet._id}`
    const response = await axios.put(url, magnet);
    console.log(url, magnet, response.data);
    return response?.data;
  } catch (e) {
    return "Unable to move magnet";
  }
}



function save() {

}

