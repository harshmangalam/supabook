import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Container,
  FormErrorMessage,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
export default function LoginWithEmailRoute() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(errors.email);

  const onSubmit = () => {};
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
              Login With Email
            </Text>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
              <FormControl id="email" isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email must be required",
                  })}
                />
                {errors?.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="password" isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password must be required",
                  })}
                />
                {errors?.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>

              <Button type="submit" colorScheme="green">
                Sign in
              </Button>
            </Stack>
            <Link href={"/auth"} passHref>
              <Button as="a" colorScheme="twitter" size="sm" mt={3} w="full">
                View other login options
              </Button>
            </Link>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
}
