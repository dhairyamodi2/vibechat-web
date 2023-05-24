'use client'
import {SessionProvider} from "next-auth/react";
import {ReactNode} from "react";

export const AuthProvider = function ({children} : {children : ReactNode}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
