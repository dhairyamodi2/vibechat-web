import Sidebar from "../components/sidebar/Sidebar";

export default async function UsersLayout({
    children
}: {
    children: React.ReactNode,
}) {
    // const users = await getUsers();

    return (
        <div className="h-full grid md:grid-cols-9 lg:grid-cols-7">
            <div className="md:col-span-3 lg:col-span-2 ">
            <Sidebar>
                fsdkfnksd
                sdfsdjfl
            </Sidebar>
            </div>
            <div className="h-full  md:col-span-6  lg:col-span-5 ">
                {children}
            </div>
        </div>

    );
}