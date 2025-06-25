"use client";

import InstallPWAButton from "./installapp";

export default function Header() {
  return (
    <div className="h-16 fixed top-0 left-0 right-0 rounded-full bg-white w-full shadow-black flex items-center px-4 sm:px-8 md:px-12 z-50">
      <h1 className="font-bold text-2xl">Frendz</h1>
      <InstallPWAButton />
    </div>
  );
}
