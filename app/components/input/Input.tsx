import {
    ChangeEvent,
    ChangeEventHandler,
    Dispatch,
    ReactNode,
    SetStateAction
} from 'react';
import { IconType } from 'react-icons';
import {AiOutlineMail} from 'react-icons/ai'
import {AuthPostFields} from "@/app/types/types";

interface InputProps {
    label: string;
    required? : boolean;
    disabled : boolean;
    name: string;
    onChange: ChangeEventHandler<HTMLInputElement>
    value: string;
    id : string;
    type : 'text' | 'password' | 'email' | 'number',
    leftIcon: ReactNode
}

export const Input : React.FC<InputProps> = function (
    {label, required, disabled, name, onChange, id, type, leftIcon, value}
){
    return (
        <div className="w-full mb-2 text-lg mt-6" >
            <span className='absolute px-3 py-4 min-w-1 text-center'>
                {leftIcon}</span>
            <input className='
                py-3.5
                px-11
                rounded-md 
                border-0 
                block 
                text-base
                text-grey-1000 
                shadow-sm 
                ring-1 
                ring-inset
                ring-gray-200
                placeholder:text-gray-500
                w-full
                focus:ring-2
                sm: text-sm
                focus:ring-purple-400' 
                type={type} name={name} value={value} onChange={onChange} placeholder={label} required={required}>
            </input>
        </div>
    )
}