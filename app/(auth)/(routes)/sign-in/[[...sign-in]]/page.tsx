import { SignIn } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";

export default function Page() {
  return (
    // <SignIn/>
    <div className="w-full flex justify-center">
      <SignInButton mode="modal">
        <button className="bg-red-700 text-sm font-bold tracking-tight rounded-sm uppercase border-2 border-white m-2 w-2/4 max-w-[330px] h-9 max-h-9 hover:animate-wiggle">
          Sign in
        </button>
      </SignInButton>
    </div>
  );
}
