import { Button, VStack } from "@chakra-ui/react";

export default function SideButtons() {
  return (
    <div>
      <VStack>
        <Button
          variant="solid"
          bg="black"
          color="white"
          fontWeight="bold"
          px={12}
        >
          Feed
        </Button>
        <Button
          variant="solid"
          bg="white"
          fontWeight="bold"
          color="black"
          px={12}
        >
          Mensagens
        </Button>
        <Button
          variant="solid"
          bg="white"
          fontWeight="bold"
          color="black"
          px={12}
        >
          Amigos
        </Button>
        <Button
          variant="solid"
          bg="white"
          fontWeight="bold"
          color="black"
          px={12}
        >
          Configurações
        </Button>
      </VStack>
    </div>
  );
}
