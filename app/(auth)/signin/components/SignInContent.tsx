import GoogleLogin from "@/app/(auth)/signin/components/GoogleLogin";
import { Flex, Text, VStack } from "@chakra-ui/react";

export const SignInContent = () => {
  return (
    <Flex bgColor="blue.400" rounded="4xl" px={8} py={8}>
      <VStack gap={8}>
        <Text color="white" fontSize="4xl" fontWeight="bold">
          Entre na Frendz!
        </Text>
        <Text color="white" fontWeight="medium">
          Faça login utilizando sua conta Google
        </Text>
        <GoogleLogin />
      </VStack>
    </Flex>
  );
};
