"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "@/app/store/meSlice";

export default function MeComponent() {
  const dispatch = useDispatch() as AppDispatch;
  const me = useSelector((state: RootState) => state.me.data);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

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
