"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PostService } from "@/app/services/PostServices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchMe } from "@/app/store/meSlice";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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
  const dispatch = useDispatch<AppDispatch>();
  const me = useSelector((state: RootState) => state.me.data);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  const searchPosts = async () => {
    const response = await PostService.getAll();
    const mappedPosts = response.map((post: any) => ({
      ...post,
      createdAt:
        typeof post.createdAt === "string"
          ? {
              _seconds: Math.floor(new Date(post.createdAt).getTime() / 1000),
              _nanoseconds: 0,
            }
          : post.createdAt,
    }));
    setPosts(mappedPosts);
  };

  const deletePost = async (indexToRemove: string) => {
    await PostService.deletePost(indexToRemove);
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== indexToRemove)
    );
  };

  useEffect(() => {
    searchPosts();
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
                  {me?.userUid === post.userUid && (
                    <div className="flex justify-end">
                      <Button onClick={() => deletePost(post.id)}>
                        <Trash2 />
                      </Button>
                    </div>
                  )}
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
