// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { url } = req.body;
  const shortUrl = Math.random().toString(36).substring(2, 5);

  res.status(200).send({ url, shortUrl });
}
