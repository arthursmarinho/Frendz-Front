import { VStack, Box } from "@chakra-ui/react";
import Me from "./Me";
import SideButtons from "./SideButtons";

export default function SideBar() {
  return (
    <Box position="fixed" height="100vh" width="250px" p={4} zIndex={1000}>
      <VStack align="stretch">
        <Me />
        <SideButtons />
      </VStack>
    </Box>
  );
}
