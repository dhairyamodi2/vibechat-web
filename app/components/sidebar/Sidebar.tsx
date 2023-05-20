import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Contact } from "@/app/user/components/Contact";

export default function Sidebar({ children }: { children: ReactNode }) {
    return (
        <div className="p-3 md:p-1 lg:p-2  m-1">
            <Navbar />
            <div className="mt-8 mx-3">
                {children}
            </div>
        </div>
    )
}