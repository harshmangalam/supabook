import {
    Box,
    Stack,
    Heading,
    Text,
    useColorModeValue,
    Container,
    Button,
    HStack,
  } from "@chakra-ui/react";
  import Link from "next/link";
  export default function AuthSigninRoute() {
    return (
      <Container>
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
            boxShadow={"md"}
            borderWidth={"2px"}
            p={6}
          >
            <HStack>
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
            </HStack>
          </Box>
        </Stack>
      </Container>
    );
  }
  