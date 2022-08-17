import {
  Box,
  Heading,
  Image,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

export default function Friend({ id, name, avatar, children }) {
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      rounded="md"
      borderWidth={"2px"}
    >
      <Image
        src={avatar}
        width={"full"}
        h={"240px"}
        roundedTop="md"
        objectFit="cover"
      />
      <Heading p={4} fontSize={"md"}>
        {name}
      </Heading>
      <VStack p={4} mt={6}>
        {children}
      </VStack>
    </Box>
  );
}
