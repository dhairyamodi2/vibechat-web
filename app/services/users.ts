import prisma from "@/app/libs/ormconfig";
import getSession from "./session";

const getUsers = async () => {
    const session = await getSession();

    if (!session?.user?.email) {
        return [];
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        });

        return users;
    } catch (error: any) {
        return [];
    }
};

export {getUsers}