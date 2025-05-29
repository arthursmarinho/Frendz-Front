"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";

interface Me {
  photoUrl: string;
  name: string;
  email: string;
}

export default function MeComponent() {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await fetch(
            `http://localhost:3000/user/me?userId=${user.uid}`
          );
          const data = await response.json();
          setMe(data);
        } catch (err) {
          console.log(err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div>
        {me && (
          <div className="flex items-center flex-col">
            <Image
              src={me.photoUrl}
              alt="Profile Photo"
              height={100}
              width={100}
              className="rounded-full"
              unoptimized
            />
            <h1 className="text-2xl text-black font-semibold">{me.name}</h1>
            <h1 className="text-gray-500">{me.email}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
