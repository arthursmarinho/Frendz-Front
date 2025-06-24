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

  return (
    <div className="h-16 fixed top-0 left-0 right-0 rounded-full bg-white w-full shadow-black flex items-center px-4 sm:px-8 md:px-12 z-50">
      <h1 className="font-bold text-2xl">Frendz</h1>

      {isInstallable && (
        <Button
          onClick={handleInstallClick}
          className="fixed bottom-4 right-4 animate-bounce"
        >
          Instalar App
        </Button>
      )}
    </div>
  );
}
