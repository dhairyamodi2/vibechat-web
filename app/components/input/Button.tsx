import {MouseEventHandler, ReactNode} from "react";

interface ButtonProps {
    children: ReactNode
    fullwidth? : true | false
    disabled? : boolean
    onClick: MouseEventHandler<HTMLButtonElement>

}
export const Button : React.FC<ButtonProps>= function({children, onClick, fullwidth, disabled}) {
    return (
        <div className="">
            <button 
               className={`
               ${disabled === true ? 'bg-purple-200' : 'bg-purple-600'} 
               rounded-md 
               p-3
               text-white
               mt-3
               ${fullwidth == true ? 'w-full' : ''}
               font-bold`}
               onClick={onClick} disabled={disabled}>{children}</button>
        </div>
    )
}