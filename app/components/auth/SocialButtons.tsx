import { ReactNode } from "react"

interface SocialButtonProps {
    children: ReactNode
}
export const SocialButtons : React.FC<SocialButtonProps>= function({...children}) {
    return (
        <div className="w-full border-gray-300 border-2 flex justify-center p-1.5 m-2.5" >
            {children.children}
        </div>
    )
}