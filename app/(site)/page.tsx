import Image from "next/image";
import { AuthForm } from "./components/AuthForm";
import Link from "next/link";
export const metadata = {
  title: `Vibechat`,
  description: `Vibechat`,
};

export default function Home() {
    // const router = useRouter();

  return (
    <div
      className="
        font-ubu
        flex
        min-h-full
        flex-col
        justify-center
        py-12
        sm: px-6
        lg: px-12
        bg-gray-100"
    >
      <div
        className="
           sm:mx-auto
           sm:w-full
           sm:max-w-md
           " // why
      >
        <Link href={'/'}><Image alt="logo" width={52} height={52} className="mx-auto w-auto" src={'/vibechat.png'}/></Link>

        <h2 className="mt-3 text-center text-2xl font-bold">
            Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
