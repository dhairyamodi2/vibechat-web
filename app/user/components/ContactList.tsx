import { User } from "@prisma/client"
import { Contact } from "./Contact"

export const ContactList = function ({users} : {users : User[]}){
    return (
        <div className="m-4">
            {users.map((user) => {
                    return <Contact user={user} key={user.id} />
                })}
        </div>
    )
}