"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PostService } from "@/app/services/PostServices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchMe } from "@/app/store/meSlice";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Me from "../home/components/Me";
import Header from "@/components/Header/header";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
    <div>
      <Header />
      <Link
        href="/home"
        className="mt-24 pl-6 underline text-blue-500 flex justify-start w-full"
      >
        <ChevronLeft /> Voltar para home
      </Link>
      <div className="max-w-2xl mx-auto p-6 mt-12">
        {isLoading ? (
          <Skeleton className="w-24 h-24 rounded-full mb-4 " />
        ) : (
          <Me />
        )}

        {isLoading ? (
          <Skeleton className="w-40 h-10 mb-2" />
        ) : (
          <div className="space-y-4">
            {myPosts.length > 0 ? (
              myPosts.map((post) => (
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
                        {new Date(
                          post.createdAt._seconds * 1000
                        ).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </h1>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-4 break-words">
                    {post.postTitle}
                  </p>
                  {me?.userUid === post.userUid && (
                    <div className="flex justify-end">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost">
                            <Trash2 color="red" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>
                              Essa ação não podera ser desfeita!
                            </SheetTitle>
                            <SheetDescription className="space-y-4 mt-2">
                              <Button
                                variant="destructive"
                                onClick={() => deletePost(post.id)}
                              >
                                Apagar post
                              </Button>
                            </SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                Você ainda não publicou nenhum post.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
