import { ReactNode } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { getUsers } from "../services/server-side/users";
import { Contact } from "./components/Contact";
import { ContactList } from "./components/ContactList";
import { getCurrentUser } from "../services/server-side/getCurrentUser";

export default async function UsersLayout({
    children
}: {
    children: ReactNode,
}) {
    const users = await getUsers();
    return (
        <div className="h-full grid md:grid-cols-9 lg:grid-cols-7">
            <div className="md:col-span-3 lg:col-span-2 h-full">

            {/* @ts-expect-error Server Component */}
            <Sidebar>
                <ContactList users={users}/>
            </Sidebar>
            </div>
            <div className="hidden sm:block md:col-span-6  lg:col-span-5 ">
                {children}
            </div>
        </div>

    );
}