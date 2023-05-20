import bcrypt from 'bcrypt'

import prisma from '@/app/libs/ormconfig'
import NextAuth, {AuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";


const authOptions : AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password : {label: 'password', type: 'password'}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid credentials')
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email : credentials.email
                    }
                })
                if(!user || !user.password){
                    throw new Error("Invalid Credentials")
                }
                const correct = await bcrypt.compare(credentials.password, user.password);

                if(!correct){
                    throw new Error('Invalid Credential');
                }
                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === 'production',
    session : {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);


export {handler as GET, handler as POST}