'use client'
import { Transition, Dialog } from "@headlessui/react"
import { Fragment, useState } from "react"
import { Button } from "../input/Button"
import { http } from "@/app/libs/http"
import { ChatType, ResponseType } from "@/app/types/types"
import { Toaster, toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

export const ConfirmDelete = function ({ chatId, isOpen, closeModal }: { chatId: string, isOpen: boolean, closeModal: () => void }) {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    async function confirmDelete(){
        alert(chatId);
        setLoading(true);
        try {
            const {data, status} = await http.delete<ResponseType<ChatType>>(`/api/chat/${chatId}`);

            if(data.success === true) {
                // toast.success('Chat Deleted');
                router.replace('/chats');
            }
            else {
                alert(data.message);
                toast.error(data.message);
            }
        } catch (error) {
            alert(error);
            toast.error('Internal Server error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { closeModal() }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 text-center"
                                    >
                                        Are you sure you want to delete this chat?
                                    </Dialog.Title>

                                    <div className="mt-4 flex justify-end border-t-slate-200 border-t-2">
                                        <Button onClick={() => { closeModal() }}>Close</Button>
                                        <button className="rounded-md p-3 mt-3 mx-3 bg-slate-300" onClick={confirmDelete} disabled={loading}>{loading ? "Loading..." : "Confirm"}</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )

} 