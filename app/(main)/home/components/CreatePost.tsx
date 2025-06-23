"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PostService } from "@/app/services/PostServices";
import { toast } from "sonner";

export default function CreatePost() {
  const [postTitle, setPostTitle] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const submitPost = async () => {
    try {
      const trimmedPost = postTitle.trim();

      if (trimmedPost === "") {
        toast("Digite algo para começar...");
        return;
      }

      const user = auth.currentUser;
      if (!user) return console.log("Usuário não está logado");
      const idToken = await user.getIdToken();

      const { ok, data } = await PostService.createPost({
        postTitle: trimmedPost,
        userName: user.displayName || user.email || "",
        userPhoto: user.photoURL || "",
        userUid: user.uid,
        idToken,
      });

      if (ok) {
        setPostTitle("");
        toast("Postado!");
        window.location.reload();
      } else {
        console.error("Erro ao enviar post:", data);
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth < 640) {
        setPlaceholder("O que você está pensando?");
      } else {
        setPlaceholder("O que você esta pensando no momento...");
      }
    };

    updatePlaceholder();

    window.addEventListener("resize", updatePlaceholder);

    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);

  return (
    <div className="flex flex-row gap-2 mb-4 mt-12">
      <Input
        placeholder={placeholder}
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        maxLength={50}
        className="placeholder:text-[11px] md:placeholder:text-base w-[200px] md:w-full"
      />
      <p className="text-gray-400">{postTitle.length}/50 caracteres</p>
      <Button onClick={submitPost} variant="default">
        Postar
      </Button>
    </div>
  );
}
