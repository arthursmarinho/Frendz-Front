"use client";

import { SignInContent } from "./components/SignInContent";
import HeroContent from "./components/HeroContent";
import ProtectedHome from "@/app/middleware/homeMiddleware";

const SignInPage = async () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <HeroContent />
      <SignInContent />
    </div>
  );
};

export default SignInPage;
