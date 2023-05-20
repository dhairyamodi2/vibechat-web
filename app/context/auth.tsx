'use client'
import {SessionProvider} from "next-auth/react";
import {ReactNode} from "react";

export const AuthProvider = function ({...children}) {
    return (
        <SessionProvider>
            {children.children}
        </SessionProvider>
    )
}
