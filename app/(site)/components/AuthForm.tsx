"use client";

import { AiOutlineMail, AiFillGithub, AiFillGoogleCircle, AiFillFacebook, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from 'react-icons/ri'
import { Input } from "./input/Input";
import { Button } from "./input/Button";
import { SocialButtons } from "./auth/SocialButtons";
import { useState } from "react";


export const AuthForm = function () {
    const [authType, setAuthType] = useState<'login' | 'register'>('login')
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
                <form>
                    {authType === 'register' && <Input
                        disabled={false}
                        id="name-field"
                        name="name"
                        label="Name"
                        onChange={() => console.log("print")}
                        type="text"
                        required={true}
                        leftIcon={<AiOutlineUser />}
                    />}
                    <Input
                        disabled={false}
                        id="email-field"
                        name="email"
                        label="Email"
                        onChange={() => console.log("print")}
                        type="email"
                        required={true}
                        leftIcon={<AiOutlineMail />}
                    />
                    <Input
                        disabled={false}
                        id="password-field"
                        name="password"
                        label="Password"
                        onChange={() => console.log("print")}
                        type="password"
                        required={true}
                        leftIcon={<RiLockPasswordLine />}
                    />
                    <Button onClick={() => { }} fullwidth={true}>{authType == 'login' ? 'Sign In' : 'Sign Out'}</Button>
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
                    <SocialButtons><AiFillFacebook className="text-2xl" /></SocialButtons>
                    <SocialButtons><AiFillGoogleCircle className="text-2xl" /></SocialButtons>
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
