"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "@/app/store/meSlice";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const me = useSelector((state: RootState) => state.me.data);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const searchPosts = async () => {
    const response = await PostService.getAll();
    const mappedPosts = response
      .map((post: any) => ({
        ...post,
        createdAt:
          typeof post.createdAt === "string"
            ? {
                _seconds: Math.floor(new Date(post.createdAt).getTime() / 1000),
                _nanoseconds: 0,
              }
            : post.createdAt,
      }))
      .sort((a: Post, b: Post) => b.createdAt._seconds - a.createdAt._seconds);
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

  return (
    <div className="flex flex-col w-[300px] sm:w-[100px] md:w-[500px] lg:w-[600px] mx-auto">
      {isLoading ? (
        <div className="flex flex-col gap-4 mt-12">
          <Skeleton className="w-40 h-4 rounded mb-2" />
          <Skeleton className="w-56 h-4 rounded" />
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl border border-gray-200 mt-12 p-12"
          >
            <div className="flex items-center ">
              <Image
                src={post.userPhoto}
                alt={post.userName}
                width={40}
                height={40}
                unoptimized
                className="rounded-full border border-gray-300 m-2"
              />
              <div>
                <h2 className="font-semibold text-gray-900 text-sm sm:text-base">
                  {post.userName}
                </h2>
                <h1 className="text-xs sm:text-sm text-gray-500">
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
            <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-4 break-words">
              {post.postTitle}
            </p>
            {me?.userUid === post.userUid && (
              <div className="flex justify-end">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash2 color="red" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Deseja apagar seu post? Essa ação não poderá ser
                        desfeita.
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction>
                        <Button onClick={() => deletePost(post.id)}>
                          Apagar
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
