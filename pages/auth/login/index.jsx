import {
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Container,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
export default function AuthSigninRoute() {
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login</Heading>
          <Text fontSize={"lg"} maxW="md" textAlign={"center"}>
            Login your account using different type of authentication providers
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"sm"}
          borderWidth={"2px"}
          p={4}
        >
          <SimpleGrid columns={[1, 2]} spacing={4} mb={6}>
            <Link href="/auth/login/login-with-email" passHref>
              <Button as="a" colorScheme="purple">
                Login With Email
              </Button>
            </Link>
            <Link href="/auth/login/login-with-magic-link" passHref>
              <Button as="a" colorScheme="pink">
                Login With Maginc Link
              </Button>
            </Link>
          </SimpleGrid>

          <Link href={"/auth/signup"} passHref>
            <Button as="a" variant={"link"} colorScheme="twitter" w="full">
              Create new account
            </Button>
          </Link>
        </Box>
      </Stack>
    </Container>
  );
}
