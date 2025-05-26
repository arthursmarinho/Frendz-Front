"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase/firebase";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, User } from "firebase/auth";
import { useRouter } from "next/navigation";

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
      <Button variant="solid" bgColor="blue.100" onClick={loginComGoogle}>
        <FcGoogle className="w-5 h-5" />
        Entrar com Google
      </Button>
    </div>
  );
}
