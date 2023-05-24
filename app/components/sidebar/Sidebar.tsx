import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Contact } from "@/app/user/components/Contact";
import { useParams } from "next/navigation";
import { getCurrentUser } from "@/app/services/server-side/getCurrentUser";

export default async function Sidebar({ children  }: { children: ReactNode }) {

    const user = await  getCurrentUser();
    return (
        <div className="flex flex-col messages overflow-y-scroll  h-full message-section">
            <Navbar user={user}/>
            {/* <div className="mt-0 sm:mt-5 mx-3"> */}
                {children}
            {/* </div> */}
        </div>
    )
}