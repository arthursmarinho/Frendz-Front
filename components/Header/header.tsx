"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
export default function Header() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("Usuário aceitou instalar o app");
      } else {
        console.log("Usuário recusou instalar o app");
      }
      setDeferredPrompt(null);
    });
  };

  if (!isInstallable) return null;

  return (
    <div className="h-16 fixed rounded-full bg-white w-full shadow-black flex items-center px-4 sm:px-8 md:px-12">
      <h1 className="font-bold text-2xl">Frendz</h1>
      <Button onClick={handleInstallClick} className="ml-auto animate-bounce">
        Instalar App
      </Button>
    </div>
  );
}
