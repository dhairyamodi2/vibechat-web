'use client'
import { Loader } from "@/app/chats/loader";
import { Avatar } from "@/app/components/chat/Avatar";
import { Button } from "@/app/components/input/Button";
import { Input } from "@/app/components/input/Input";
import { http } from "@/app/libs/http";
import { getCurrentUser } from "@/app/services/server-side/getCurrentUser"
import { ResponseType } from "@/app/types/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react"
import { CldImage, CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaUserAlt } from 'react-icons/fa'

export const Profile = function ({ user }: { user: User | null }) {
    // const session = useSession();
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const [name, setName] = useState(user &&  user.name ? user.name : '');

    async  function handleSubmit() {
        if(name.length === 0) {
            toast.error("Name cannot be empty");
            return;
        }
        try {
            const {data, status} = await http.put<ResponseType<any>>('/api/user/update', JSON.stringify({name: name}))
            if(data.success) {
                toast.success("Name updated");
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }
            else {
                toast.error(data.message)
            } 
        } catch (error) {
            toast.error('Internal server error')
        }

    }
    async function handleUpload(result: any) {
        // setLoader(true);
        try {
            const { data, status } = await http.put<ResponseType<any>>('/api/user/update', JSON.stringify({ image: result.info.secure_url }));
            if (data.success === true) {
                toast.success('Image Updated');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }  
            else {
                toast.error(data.message);
                return;
            }
        } catch (error) {
            toast.error('Internal Server Error')
            return;
        } finally {
            setLoader(false);
        }
    }
    return (

        <div>
            {loader ? <Loader /> : <div className="p-3">
                <div className="flex flex-col items-center ">
                    <div className="inline-block relative rounded-3xl h-16 w-16 md:h-24 md:w-24 images">
                        <Image alt="avatar" src={user && user.image ? user.image : '/avatar.png'} fill className="rounded-full" />
                    </div>
                    <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="ml_default" onError={(e: any) => { toast.error('Internal Server Error') }}>
                        <Button onClick={() => { }}>Upload Image</Button>
                    </CldUploadButton>
                </div>
                <div>
                    <div className="flex flex-col items-center ">
                        <Input label="Name" type="text" value={name} leftIcon={<FaUserAlt />} onChange={(e) => {
                            setName(e.target.value)
                        }} disabled={false} id="" name="name" ></Input>
                        <Button onClick={() => {handleSubmit()}} disabled={false}>Update Name</Button>
                    </div>
                </div>

            </div>}
        </div>

    )
}