"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

interface Post {
  id: string;
  userUid: string;
  postTitle: string;
  userName: string;
  userPhoto: string;
  createdAt: FirestoreTimestamp;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [me, setMe] = useState<{ userUid: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await fetch(
            `http://localhost:3000/user/me?userId=${user.uid}`
          );
          const data = await response.json();
          setMe(data);
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const searchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Erro na requisição:", err);
      }
    };

    searchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
      });
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Erro ao deletar o post:", err);
    }
  };

  return (
    <VStack align="center" mt={4} px={4}>
      {posts.map((post) => (
        <Card.Root
          key={post.id}
          bg="blue.50"
          borderWidth="1px"
          borderColor="gray.200"
          boxShadow="sm"
          borderRadius="lg"
          w="100%"
          maxW="800px"
          minH="200px"
        >
          <CardHeader>
            <Flex align="center">
              <Image
                src={post.userPhoto}
                alt={post.userName}
                boxSize="50px"
                borderRadius="full"
                mr={3}
              />
              <Box>
                <Text fontWeight="bold" fontSize="md" color="gray.800">
                  {post.userName}
                </Text>
                <Text fontSize="xs" color="gray.500">
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
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text fontSize="sm" color="gray.700">
              {post.postTitle}
            </Text>
            {me?.userUid === post.userUid && (
              <Button
                colorScheme="red"
                size="sm"
                mt={2}
                onClick={() => handleDelete(post.id)}
              >
                Deletar
              </Button>
            )}
          </CardBody>
        </Card.Root>
      ))}
    </VStack>
  );
}
