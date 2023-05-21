import getSession from "./session"
import prisma from '@/app/libs/ormconfig'
export const getCurrentUser = async function() {
    try {
        const session = await getSession();

        if(!session?.user?.email) return null;

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })
        if(!user) return null;
        return user;
    } catch (error) {
        return null;
    }
}