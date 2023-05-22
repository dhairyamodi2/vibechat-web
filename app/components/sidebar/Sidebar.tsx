import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Contact } from "@/app/user/components/Contact";
import { useParams } from "next/navigation";

export default function Sidebar({ children }: { children: ReactNode }) {
    

    return (
        <div className="flex flex-col messages overflow-y-scroll  h-full message-section">
            <Navbar />
            {/* <div className="mt-0 sm:mt-5 mx-3"> */}
                {children}
            {/* </div> */}
        </div>
    )
}