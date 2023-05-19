'use-client'
import {MouseEventHandler, ReactNode} from "react"

interface SocialButtonProps {
    children: ReactNode
    onClick : () => void;
}
export const SocialButtons : React.FC<SocialButtonProps>= function({children, onClick}) {
    return (
        <div className="w-full border-gray-300 border-2 flex justify-center p-1.5 m-2.5 hover:bg-gray-100 cursor-pointer" onClick={onClick}>

            {children}
        </div>
    )
}