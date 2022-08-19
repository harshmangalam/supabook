import {
  Box,
  Heading,
  useColorModeValue,
  VStack,
  Image as ChakraImage,
} from "@chakra-ui/react";
import Image from "next/image";

export default function Friend({ id, name, avatar, children }) {
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      rounded="md"
      borderWidth={"2px"}
    >
      {avatar?.url ? (
        <Image
          src={avatar?.url}
          height={240}
          width={200}
          alt={name}
          layout="responsive"
          priority
        />
      ) : (
        <ChakraImage
          src={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
          height={240}
          width={"full"}
          alt={name}
          loading="lazy"
          objectFit="cover"
        />
      )}
      <Heading p={4} fontSize={"md"}>
        {name}
      </Heading>
      <VStack p={4} mt={6}>
        {children}
      </VStack>
    </Box>
  );
}
