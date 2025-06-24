"use client";

import Header from "@/components/Header/header";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import SideBar from "./components/SideBar";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="hidden md:block fixed h-full w-64 mt-12">
          <SideBar />
        </div>

        <div className="w-0 md:w-64"></div>

        <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 lg:p-12 ml-0">
          <div className="md:hidden mb-4">
            <SideBar />
          </div>

          <CreatePost />
          <motion.h1
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className="text-3xl font-bold"
          >
            Feed
          </motion.h1>
          <PostList />
        </div>
      </div>
    </div>
  );
}
