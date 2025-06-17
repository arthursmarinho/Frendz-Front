"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "@/app/store/meSlice";

export default function MeComponent() {
  const [cachedPhoto, setCachedPhoto] = useState<string | null>(null);
  const dispatch = useDispatch() as AppDispatch;
  const me = useSelector((state: RootState) => state.me.data);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  async function toBase64FromUrl(url: string): Promise<string> {
    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("Erro ao converter imagem");
        }
      };
      reader.readAsDataURL(blob);
    });
  }

  useEffect(() => {
    if (me?.photoUrl && me.userUid) {
      const key = `photo-base64-${me.userUid}`;
      const cached = localStorage.getItem(key);

      if (cached) {
        setCachedPhoto(cached);
      } else {
        toBase64FromUrl(me.photoUrl)
          .then((base64) => {
            localStorage.setItem(key, base64);
            setCachedPhoto(base64);
          })
          .catch(() => {
            setCachedPhoto("/default-avatar.png");
          });
      }
    }
  }, [me?.userUid, me?.photoUrl]);

  if (!me) return null;

  return (
    <div>
      <div className="flex items-center flex-col">
        <Image
          src={cachedPhoto || "/default-avatar.png"}
          alt="Profile Photo"
          height={100}
          width={100}
          className="rounded-full"
          unoptimized
          loading="lazy"
        />
        <h1 className="text-2xl text-black font-semibold">{me.name}</h1>
        <h1 className="text-gray-500">{me.email}</h1>
      </div>
    </div>
  );
}
