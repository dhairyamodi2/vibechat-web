import primsa from '@/app/libs/ormconfig'
import { NextResponse } from 'next/server';

export async function GET(req : Request) {
    try {
        const contacts = await primsa.user.findMany();
        return NextResponse.json({
            success: true,
            message: "",
            data: contacts
        })  
    } catch (error) {
        console.log(error + 'from get all contacts');
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            data: null
        })
    }
}