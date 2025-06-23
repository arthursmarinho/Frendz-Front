"use client";

import Header from "@/components/Header/header";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import SideBar from "./components/SideBar";

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="hidden md:block fixed h-full w-64 mt-12">
          <SideBar />
        </div>

        <div className="w-0 md:w-64"></div>

        <div className="flex-1 flex flex-col p-12 ml-0 md:ml-0 lg:ml-0">
          <div className="md:hidden mb-4">
            <SideBar />
          </div>

          <CreatePost />
          <h1 className="text-4xl font-bold fade-in duration-500">Feed</h1>
          <PostList />
        </div>
      </div>
    </div>
  );
}
