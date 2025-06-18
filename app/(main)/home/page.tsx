"use client";

import Header from "@/components/Header/header";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import SideBar from "./components/SideBar";

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
        <div className="flex justify-start md:justify-end lg:justify-end mt-12">
          <SideBar />
        </div>
        <div className="flex justify-start w-full flex-col p-12">
          <CreatePost />
          <h1 className="text-4xl font-bold">Feed</h1>
          <PostList />
        </div>
        <div>
          <></>
        </div>
      </div>
    </div>
  );
}
