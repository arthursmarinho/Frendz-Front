"use client";

import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Trash2 } from "lucide-react";

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

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [me, setMe] = useState<{ userUid: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await fetch(
            `http://localhost:3000/user/me?userId=${user.uid}`
          );
          const data = await response.json();
          setMe(data);
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const searchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Erro na requisição:", err);
      }
    };

    searchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
      });
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Erro ao deletar o post:", err);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center gap-4 mb-2">
            <Image
              src={post.userPhoto}
              alt={post.userName}
              width={48}
              height={48}
              unoptimized
              className="rounded-full border border-gray-300"
            />
            <div>
              <h2 className="font-semibold text-gray-900">{post.userName}</h2>
              <h1 className="text-sm text-gray-500">
                {new Date(post.createdAt._seconds * 1000).toLocaleString(
                  "pt-BR",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </h1>
            </div>
          </div>

          <p className="text-gray-800 leading-relaxed mb-4">{post.postTitle}</p>

          {me?.userUid === post.userUid && (
            <div className="flex justify-end">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Deseja apagar seu Post?</SheetTitle>
                    <SheetDescription className="space-y-4 mt-2">
                      <p className="text-sm text-gray-600">
                        Essa ação não poderá ser desfeita.
                      </p>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        Deletar
                      </Button>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
