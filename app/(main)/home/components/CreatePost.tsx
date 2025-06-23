"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PostService } from "@/app/services/PostServices";
import { toast } from "sonner";

export default function CreatePost() {
  const [postTitle, setPostTitle] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 50) {
      toast("Limite de caracteres atingido.");
      return;
    }

    setPostTitle(value);
  };

  const submitPost = async () => {
    try {
      if (postTitle.length > 50) {
        toast("Limite de caracteres atingido.");
        return;
      }

      const user = auth.currentUser;
      if (!user) return console.error("Usuário não está logado");

      const idToken = await user.getIdToken();

      const { ok, data } = await PostService.createPost({
        postTitle,
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

  return (
    <div className="flex flex-row gap-2 mb-4 mt-12">
      <Input
        placeholder="O que você está pensando no momento?..."
        value={postTitle}
        onChange={handleInputChange}
      />
      <Button onClick={submitPost} variant="default">
        Postar
      </Button>
    </div>
  );
}
