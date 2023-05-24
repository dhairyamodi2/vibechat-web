import { NextResponse} from "next/server";
import {isValidBody} from "@/app/libs/typeGuards";
import {Request} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import prisma from '@/app/libs/ormconfig';
import validator from 'validator';
import bcrypt from "bcrypt";



type RequestBody  = {
    name : string;
    email : string;
    password : string;
}
export async function POST(
    req: Request,
) {
    try{
        const body = await req.json() as RequestBody;
        let message : Array<string> = []
        if(!isValidBody<RequestBody>(body, ['name', 'email', 'password'], message)){
            return NextResponse.json({
                success: false,
                message,
                data: null
            }, {status: 402})
        }
        if(!body.email || !validator.isEmail(body.email)){
            return NextResponse.json({
                message: "enter valid email",
                success: false,
                data: null
            }, {status: 400})
        }
        const password = await bcrypt.hash(body.password, 12);

        const user = await prisma.user.create({
            data: {
                name : body.name,
                email : body.email,
                password
            }
        })
        return NextResponse.json({
            success: true,
            message: "",
            data: user
        }, {status: 201})
    } catch (e) {
      
        if ((e as any).code != undefined && (e as any).code === 'P2002'){
            return NextResponse.json({
                success: false,
                message: "Duplicate Entry",
                data: null
            })
        }
        console.log('coming from registration');
        console.log(e);
        return NextResponse.json({
            success: false,
            message: e,
            data: null
        }, {status: 500})
    }
}
