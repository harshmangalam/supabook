import {
  Box,
  Button,
  Heading,
  Image,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

export default function Friend() {
  return (
    <Box bg={useColorModeValue("white", "gray.700")} rounded="md" borderWidth={"2px"}>
      <Image
        src="https://scontent.fixr3-2.fna.fbcdn.net/v/t39.30808-1/297139277_451259153555074_3506342414216387767_n.jpg?stp=dst-jpg_p160x160&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=caJBRwg8o1wAX8_UDd5&_nc_ht=scontent.fixr3-2.fna&oh=00_AT_T5tyUz7HWQ5VOGI8hOaidloy2jcVJr7VQKPh7FvpzBQ&oe=62FE54A6"
        width={"full"}
        h={"240px"}
        roundedTop="md"
        objectFit="cover"
      />
      <Heading p={4} fontSize={"md"}>Harsh Mangalam</Heading>
      <VStack p={4} mt={6}>
        <Button colorScheme={"red"} width="full">
          Unfriend
        </Button>
      </VStack>
    </Box>
  );
}
