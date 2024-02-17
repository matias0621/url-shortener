import { PrismaClient } from "@prisma/client";

export default function ShortIdPage() {
    return (
        <div>ShortID redirect</div>
    )
}

export async function getServerSideProps({ params }) {
    const prisma = new PrismaClient();
    const { shortId } = params

    try {
        const data = await prisma.link.findUnique({
            where: { shortUrl: shortId }, // Corrección aquí
        });

        if (!data){
            return { redirect: { destination: '/' } }
        }

        return{
            redirect: { destination: data.url }
        }
    } catch (error) {
        console.error("Error retrieving URL from database:", error);
        return {
            redirect: { destination: '/' }
        }
    } finally {
        await prisma.$disconnect();
    }
}
