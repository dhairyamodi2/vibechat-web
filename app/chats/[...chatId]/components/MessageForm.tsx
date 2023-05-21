import { Input } from '@/app/components/input/Input'
import  {BsImage} from 'react-icons/bs'
import { RiSendPlaneFill } from 'react-icons/ri'
export const MessageForm =  function () {
    return (
        <div className="mt-3">
            <div className='flex flex-col'>
            <div className="flex items-center justify-center">
                <BsImage className='text-purple-600 mx-2' size={25}></BsImage>
                <input type='text' className='placeholder:text-sm bg-gray-100 p-2 rounded-lg flex-1 focus:border-none focus:outline-none' placeholder='Type Message'>
                </input>
                <RiSendPlaneFill className='text-purple-600 mx-2' size={25}></RiSendPlaneFill>
            </div>
            <div className='flex 1'></div>
            </div>
        </div>
    )
}