"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Login() {
  const router = useRouter();

  const loginComGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/home");
    } catch (err: any) {}
  };

  return (
    <div>
      <Button variant="outline" onClick={loginComGoogle}>
        <FcGoogle className="w-5 h-5" />
        Entrar com Google
      </Button>
    </div>
  );
}
