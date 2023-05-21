import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Contact } from "@/app/user/components/Contact";

export default function Sidebar({ children }: { children: ReactNode }) {
    return (
        <div className="">
            <Navbar />
            <div className="mt-5 mx-3">
                {children}
            </div>
        </div>
    )
}