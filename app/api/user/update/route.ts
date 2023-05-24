import OrmClient from "@/app/libs/ormconfig";
import { getCurrentUser } from "@/app/services/server-side/getCurrentUser";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ success: false, message: 'Unauthorized', data: null }, { status: 401 })
        }
        const { image, name } = await req.json();
        const updatedUser = await OrmClient.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image: image ? image : currentUser.image,
                name: name ? name : currentUser.name
            }
        })
        return NextResponse.json({
            success: true,
            message: 'updated',
            data: null
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            data: null
        })
    }
}