"use client";

import { use, useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreatePost() {
  const [postTitle, setPostTitle] = useState("");
  const [post, setPost] = useState([]);

  const enviarPedido = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return console.error("Usuário não está logado");

      const idToken = await user.getIdToken();

      const response = await fetch("http://localhost:3000/posts/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          postTitle,
          userName: user.displayName || user.email,
          userPhoto: user.photoURL,
          userUid: user.uid,
        }),
      });

      if (response.ok) {
        console.log("Post enviado com sucesso!");
        setPostTitle("");
        window.location.reload();
      } else {
        console.error("Erro ao enviar post");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  return (
    <div className="flex flex-row gap-2 mb-4">
      <Input
        placeholder="O que você está pensando no momento?..."
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />
      <Button onClick={enviarPedido} variant="default">
        Postar
      </Button>
    </div>
  );
}
