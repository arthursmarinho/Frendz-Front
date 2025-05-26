"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";

interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

interface Post {
  id: string;
  postTitle: string;
  userName: string;
  userPhoto: string;
  createdAt: FirestoreTimestamp;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const searchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setPosts(data);

        if (response.ok) {
          console.log("Pedido enviado com sucesso!");
        } else {
          console.error("Erro ao enviar pedido");
        }
      } catch (err) {
        console.error("Erro na requisição:", err);
      }
    };
    searchPosts();
  }, []);

  console.log(posts);

  return (
    <VStack align="stretch" mt="128px">
      {posts.map((post) => (
        <Card.Root
          key={post.id}
          bg="gray.50"
          border="1px"
          borderColor="gray.200"
          boxShadow="md"
        >
          <CardHeader>
            <Flex align="center">
              <Image
                src={post.userPhoto}
                alt={post.userName}
                boxSize="40px"
                borderRadius="full"
                mr={3}
              />
              <Text fontWeight="bold" color="black">
                {post.userName}
              </Text>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text color="black">{post.postTitle}</Text>
            <Text fontSize="xs" color="gray.500" textAlign="right">
              {new Date(post.createdAt._seconds * 1000).toLocaleString(
                "pt-BR",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </Text>
          </CardBody>
        </Card.Root>
      ))}
    </VStack>
  );
}
