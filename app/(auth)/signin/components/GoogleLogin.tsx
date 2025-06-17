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
      const user = auth.currentUser;
      if (!user) return;
      const idToken = await user.getIdToken();

      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      router.push("/home");
    } catch (err) {
      console.error("Erro ao logar:", err);
    }
  };

  return (
    <div>
      <Button variant="outline" onClick={loginComGoogle}>
        <FcGoogle className="w-5 h-5 mr-2" />
        Entrar com Google
      </Button>
    </div>
  );
}
