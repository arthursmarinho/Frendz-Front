import { Flex, SimpleGrid, VStack, Text, Box } from "@chakra-ui/react";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import SideBar from "./components/SideBar";

export default function HomePage() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} minH="100vh">
      <Flex bgColor="white" justify="end" p={12}>
        <SideBar />
      </Flex>
      <Flex align="start" justify="center" bg="skyblue" color="white" pt="64px">
        <VStack>
          <div className="flex justify-start w-full">
            <Text fontWeight="extrabold" fontSize="4xl" color="black">
              Feed
            </Text>
          </div>
          <PostList />
          <Box position="fixed" height="100vh" p={4} zIndex={1000} top="800px">
            <CreatePost />
          </Box>
        </VStack>
      </Flex>
      <Flex></Flex>
    </SimpleGrid>
  );
}
