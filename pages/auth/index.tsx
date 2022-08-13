import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Container,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
export default function AuthRoute() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Container>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Authenticate</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Sign in using different type of authentication providers
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={4}
          >
            <SimpleGrid columns={2} spacing={4}>
              <Link href="/auth/login-with-email" passHref>
                <Button as="a" colorScheme="green">Login With Email</Button>
              </Link>
              <Link href="/auth/login-with-magic-link" passHref>
                <Button as="a" colorScheme="green">Login With Maginc Link</Button>
              </Link>
            </SimpleGrid>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
}
