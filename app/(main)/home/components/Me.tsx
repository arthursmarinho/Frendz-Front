"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { Flex, Text, Box } from "@chakra-ui/react";

interface Me {
  photoUrl: string;
  name: string;
  email: string;
}

export default function MeComponent() {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await fetch(
            `http://localhost:3000/user/me?userId=${user.uid}`
          );
          const data = await response.json();
          setMe(data);
        } catch (err) {
          console.log(err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box>
      {me && (
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap={2}
          mt={8}
          mb={2}
        >
          <Image
            src={me.photoUrl}
            alt="Profile Photo"
            height={100}
            width={100}
            className="rounded-full"
            unoptimized
          />
          <Text fontWeight="bold" fontSize="xl" color="black">
            {me.name}
          </Text>
          <Text color="gray.600">{me.email}</Text>
        </Flex>
      )}
    </Box>
  );
}
