import { Box, Heading, useColorModeValue, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { ReactElement } from "react";

interface Props {
  id: string;
  name: string;
  avatar: any;
  children: ReactElement;
}
export default function Friend({ id, name, avatar, children }: Props) {
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      rounded="md"
      borderWidth={"2px"}
    >
      <Image
        src={avatar?.url}
        height={240}
        width={200}
        alt={name}
        loading="lazy"
        layout="responsive"
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
