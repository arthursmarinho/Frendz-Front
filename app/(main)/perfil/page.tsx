"use client";

import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Me {
  photoUrl: string;
  name: string;
  email: string;
  userUid: string;
}

interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

interface Post {
  id: string;
  userUid: string;
  postTitle: string;
  userName: string;
  userPhoto: string;
  createdAt: FirestoreTimestamp;
}

export default function Perfil() {
  const [me, setMe] = useState<Me | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Erro ao buscar posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const myPosts = posts.filter((post) => post.userUid === me?.userUid);

  return (
    <div className="max-w-2xl mx-auto p-6">
      {me && (
        <div className="flex items-center flex-col mb-10">
          <Image
            src={me.photoUrl}
            alt="Foto de perfil"
            height={100}
            width={100}
            className="rounded-full"
            unoptimized
          />
          <h1 className="text-2xl text-black font-semibold mt-4">{me.name}</h1>
          <h2 className="text-gray-500">{me.email}</h2>
        </div>
      )}

      <div className="space-y-4">
        {myPosts.length > 0 ? (
          myPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={post.userPhoto}
                  alt={post.userName}
                  width={40}
                  height={40}
                  className="rounded-full"
                  unoptimized
                />
                <div>
                  <p className="font-semibold text-black">{post.userName}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(
                      post.createdAt._seconds * 1000
                    ).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
              <p className="text-gray-800">{post.postTitle}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">Nenhum post encontrado.</p>
        )}
      </div>
    </div>
  );
}
