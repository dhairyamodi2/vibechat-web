import {AuthPostFields, ResponseType} from "@/app/types/types";
import {http} from "@/app/libs/http";
import toast from "react-hot-toast";
import {Dispatch, SetStateAction} from "react";
import {signIn} from "next-auth/react";


export const registerUser = async function(postFields : AuthPostFields, setLoading: Dispatch<SetStateAction<boolean>>) {
    setLoading(true);
    try {
        const {data, status} = await http.post<ResponseType<any>>('/api/register', JSON.stringify(postFields))
        if(data.success === true){
            toast.success("Registered Successfully!");
            await signIn('credentials', {email: postFields.email, password: postFields.password, redirect: false});
            return;
        }
        else {
            toast.error(data.message);
        }
    } catch (e) {
        console.log(e);
        toast.error("Bad request");
    } finally {
        setLoading(false)
    }
}


export const signInUser = async function(postFields : AuthPostFields, setLoading: Dispatch<SetStateAction<boolean>>){
    setLoading(true);
    try {
        const payload = await signIn('credentials', {email: postFields.email, password: postFields.password, redirect: false});
        if(payload?.error){
            toast.error('Invalid Credentials');
            // return;
        }
        if(payload?.ok && !payload?.error) {
            toast.success('Logged in')
        }
    } catch (e) {
        console.log(e);
        toast.error('Bad Request');
    } finally {
        setLoading(false)
    }
}


export const socialAuth = async function(action: string) {
    try{
        const payload = await signIn(action, {redirect: false});
        if(payload?.error){
            toast.error('Invalid Credentials');
            // return;
        }
        if(payload?.ok && !payload?.error) {
            toast.success('Logged in')
        }
    } catch (e) {
        console.log(e);
        toast.error('Bad Request');
    }
}