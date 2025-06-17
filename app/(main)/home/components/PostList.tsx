"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "@/app/store/meSlice";
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
import { PostService } from "@/app/services/PostServices";
import { AppDispatch, RootState } from "@/app/store";

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
  const dispatch = useDispatch<AppDispatch>();
  const me = useSelector((state: RootState) => state.me.data);

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

  useEffect(() => {
    searchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      await PostService.deletePost(postId),
        {
          method: "DELETE",
        };
      searchPosts();
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
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Deseja apagar seu Post?</SheetTitle>
                    <SheetDescription className="space-y-4 mt-2">
                      <h1 className="text-sm text-gray-600">
                        Essa ação não poderá ser desfeita.
                      </h1>
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
