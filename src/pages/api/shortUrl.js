// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { url } = req.body;

  try {
    // Generar una URL corta única (puedes implementar lógica más robusta aquí)
    const shortUrl = Math.random().toString(36).substring(2, 5);

    // Crear una nueva entrada en la base de datos
    await prisma.link.create({
      data: { url, shortUrl },
    });

    // Recuperar todas las URLs cortas almacenadas en la base de datos
    const allLinks = await prisma.link.findMany();
    const urlArray = allLinks.map(link => link.shortUrl);

    // Enviar todas las URLs cortas al frontend
    return res.status(200).send(urlArray);
  } catch (error) {
    return res.status(500).send({ error });
  }
}
