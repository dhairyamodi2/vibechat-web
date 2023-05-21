import { ReactNode } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { getUsers } from "../services/server-side/users";
import { Contact } from "./components/Contact";

export default async function UsersLayout({
    children
}: {
    children: ReactNode,
}) {
    const users = await getUsers();

    return (
        <div className="h-full grid md:grid-cols-9 lg:grid-cols-7">
            <div className="md:col-span-3 lg:col-span-2 ">
            <Sidebar>
                {users.map((user) => {
                    return <Contact user={user} key={user.id} />
                })}
            </Sidebar>
            </div>
            <div className="h-full  md:col-span-6  lg:col-span-5 ">
                {children}
            </div>
        </div>

    );
}