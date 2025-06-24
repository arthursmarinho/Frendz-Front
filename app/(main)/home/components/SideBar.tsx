"use client";

import { useState, useEffect } from "react";
import Me from "./Me";
import SideButtons from "./SideButtons";
import { ChevronLeft, Menu } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {!isOpen && (
        <button
          className="sm:hidden fixed left-4 mt-6 top-12 bg-white rounded-sm flex transition-all duration-700"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={32} />
        </button>
      )}

      <div
        className={`flex flex-col p-12 items-center sm:flex ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-end w-full">
          <button
            className="sm:hidden mt-4 p-2"
            onClick={() => setIsOpen(false)}
          >
            <ChevronLeft />
          </button>
        </div>

        {isLoading ? (
          <Skeleton className="w-24 h-24 rounded-full mb-4" />
        ) : (
          <Me />
        )}

        {isLoading ? (
          <Skeleton className="w-40 h-10 rounded mb-2" />
        ) : (
          <SideButtons />
        )}
      </div>
    </div>
  );
}
