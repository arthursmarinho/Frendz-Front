import { Flex, VStack, SimpleGrid } from "@chakra-ui/react";
import { SignInContent } from "./components/SignInContent";
import HeroContent from "./components/HeroContent";

const SignInPage = async () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} minH="100vh">
      <Flex align="center" justify="center" bg="gray.900" color="white">
        <HeroContent />
      </Flex>

      <Flex align="center" justify="center" bg="white" color="white">
        <VStack>
          <SignInContent />
        </VStack>
      </Flex>
    </SimpleGrid>
  );
};

export default SignInPage;
