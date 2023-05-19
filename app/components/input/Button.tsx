import {MouseEventHandler, ReactNode} from "react";

interface ButtonProps {
    children: ReactNode
    fullwidth? : true | false
    onClick: MouseEventHandler<HTMLButtonElement>

}
export const Button : React.FC<ButtonProps>= function({children, onClick, fullwidth}) {
    return (
        <div className="">
            <button 
               className={`
               bg-purple-600 
               rounded-md 
               p-3
               text-white
               mt-3
               ${fullwidth == true ? 'w-full' : ''}
               font-bold`}
               onClick={onClick}>{children}</button>
        </div>
    )
}