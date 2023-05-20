import { ReactNode } from "react";
import { Navbar } from "./Navbar";

export default function Sidebar({children} : {children : ReactNode}) {
    return (
        <div className="">
            <Navbar />
            <div className=""> 
            {children}
            </div>
        </div>
    )
}