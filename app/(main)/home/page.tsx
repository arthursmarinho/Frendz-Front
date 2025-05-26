import { Flex, SimpleGrid, VStack, Text } from "@chakra-ui/react";
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
          <Text fontWeight="bold">Feed</Text>
          <CreatePost />
          <PostList />
        </VStack>
      </Flex>
      <Flex></Flex>
    </SimpleGrid>
  );
}
