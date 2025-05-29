"use client";

import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { auth } from "@/lib/firebase/firebase";

export default function CreatePost() {
  const [postTitle, setPostTitle] = useState("");

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
      } else {
        console.error("Erro ao enviar post");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  return (
    <Box bgColor="#FFF5DF" px={12} py={12} rounded="3xl">
      <Flex direction="row" gap={2}>
        <Input
          placeholder="O que você está pensando no momento?..."
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          bgColor="gray.100"
          px="16px"
          w="400px"
          rounded="full"
          color="black"
          _placeholder={{ color: "black" }}
        />
        <Button
          onClick={enviarPedido}
          bgColor="black"
          color="white"
          rounded="full"
        >
          Postar
        </Button>
      </Flex>
    </Box>
  );
}
