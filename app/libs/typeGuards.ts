import { User } from "@prisma/client";

export function isValidBody<T extends Record<string, unknown>>(
    body: any,
    fields: (keyof T)[],
    message: Array<string>
): body is T {
    
    let bodyKeys : Array<string> = Object.keys(body);

    fields.forEach((field) => {
        const x = bodyKeys.includes(field as string)
        if(!x) {
            message.push(`${field as string} required`);
            return;
        }
    })
    console.log(message)
    if(message.length === 0) return true;
    return false;
}


export type NewChat = {
    isGroup?: boolean;
    userId? : string;
    name?: string;
    members? : Array<User>
}