"use client";

import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import SideBar from "./components/SideBar";

export default function HomePage() {
  return (
    <div className="grid grid-cols-3">
      <div className="flex justify-end">
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
  );
}
