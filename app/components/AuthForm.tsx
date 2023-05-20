"use client";

import { AiOutlineMail, AiFillGithub, AiFillGoogleCircle, AiFillFacebook, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from 'react-icons/ri'
import { Input } from "./input/Input";
import { Button } from "./input/Button";
import { SocialButtons } from "./auth/SocialButtons";
import {
    ChangeEvent,
    FormEventHandler,
    MouseEventHandler, useEffect,
    useState
} from "react";
import {AuthPostFields} from "@/app/types/types";
import {registerUser, signInUser, socialAuth} from "@/app/services/auth";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";


export const AuthForm = function () {
    const [authType, setAuthType] = useState<'login' | 'register'>('login')
    const [loading, setLoading] = useState(false);
    const [postFields, setPostFields] = useState<AuthPostFields>({
        name : '',
        email: '',
        password: ''
    })
    function handleChange(e : ChangeEvent<HTMLInputElement>){
        setPostFields((prevState) => {
            return {
                ...prevState,
                [e.target.name] : e.target.value
            }
        })
    }

    const handleSign : FormEventHandler<HTMLFormElement> = async function(e) {
        e.preventDefault();
        if(authType === 'register') {
            await registerUser(postFields, setLoading);
        }
        if(authType === 'login') {
            await signInUser(postFields, setLoading);
        }
    }

    const handleGithub = function() {
        socialAuth('github')
    }

    const handleGoogle = function() {
        socialAuth('google')
    }

    return (
        <div className="sm : mx-auto sm: w-full sm : max-w-md mt-6 ">

                <div
                    className="
              bg-white
              px-3
              py-6
              shadow
              sm: rounded-lg"
                >
                    <form onSubmit={handleSign}>
                        {authType === 'register' && <Input
                            disabled={false}
                            id="name-field"
                            name="name"
                            label="Name"
                            onChange={handleChange}
                            type="text"
                            value={postFields.name}
                            required={true}
                            leftIcon={<AiOutlineUser />}
                        />}
                        <Input
                            disabled={false}
                            id="email-field"
                            name="email"
                            label="Email"
                            onChange={handleChange}
                            type="email"
                            value={postFields.email}
                            required={true}
                            leftIcon={<AiOutlineMail />}
                        />
                        <Input
                            disabled={false}
                            id="password-field"
                            name="password"
                            label="Password"
                            value={postFields.password}
                            onChange={handleChange}
                            type="password"
                            required={true}
                            leftIcon={<RiLockPasswordLine />}
                        />
                        <Button onClick={()=> {}} fullwidth={true} disabled={loading}>{loading ? "Loading..." : authType == 'login' ? 'Sign In' : 'Sign Out'}</Button>
                    </form>
                    <div className="mt-5">
                        <div className="relative">
                            <div className=" absolute inset-0 flex items-center justify-center ">
                                {/* use absolute when two separate element are overalapping at same level */}
                                <div className="w-full border-gray-300 border-t" />

                            </div>
                            <div className="relative flex justify-center text-sm ">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <SocialButtons onClick={handleGithub}><AiFillFacebook className="text-2xl" /></SocialButtons>
                        <SocialButtons onClick={handleGoogle}><AiFillGoogleCircle className="text-2xl" /></SocialButtons>
                    </div>

                    <div className="flex justify-center text-sm mt-3 text-gray-400">
                        <div>
                            {authType === 'login' ? 'New to Vibechat?' : 'Already have an account?'}
                        </div>
                        <div onClick={() => {
                            if(authType === 'login') {
                                setAuthType('register')
                            }
                            else {
                                setAuthType('login')
                            }
                        }} className="cursor-pointer underline px-1">
                            {authType === 'login' ? 'Create Account' : 'Login'}
                        </div>
                    </div>

                </div>


        </div>
    );
};
