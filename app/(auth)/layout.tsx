import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await currentProfile();

  if (profile) {
    return redirect("/");
  }

  return (
    <>
      <h1 className="w-full flex justify-center uppercase text-5xl p-5">
        wurstcord
      </h1>
      <div className="pl-5">
        <p className="text-2xl">welcome!</p>
        <ul className="p-5">
          <li>
            * if you have invite code you have to sign in or sign up first, then
            paste your invite link into browser.{" "}
          </li>
          <li className="pt-5">
            * if you want to create your own server - just sign in/sign up!
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center h-2/4">
        <p className="p-5 text-center">
          remember - you can always delete your server or account
        </p>
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
