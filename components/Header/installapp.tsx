"use client";

import { useEffect, useState } from "react";

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt(); // Exibe o prompt de instalação

    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("Usuário aceitou instalar o app");
      } else {
        console.log("Usuário recusou instalar o app");
      }
      setDeferredPrompt(null);
      setCanInstall(false);
    });
  };

  if (!canInstall) return null;

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#0070f3",
        color: "white",
        border: "none",
        borderRadius: "0.5rem",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        zIndex: 9999,
      }}
    >
      Instalar App
    </button>
  );
}
