import { ReactNode } from "react";
import { Navbar } from "./Navbar";

export default function Sidebar({children} : {children : ReactNode}) {
    return (
        <div className="h-full py-0">
            <Navbar />
            <div className="h-full"> 
            
            {children}
            </div>
        </div>
    )
}