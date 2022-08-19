import {
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../../utils/supabaseClient";
import { useAuthContext } from "../../../context/auth";
import { useRouter } from "next/router";
import Head from "next/head";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  })
  .required();

export default function AuthSigninSigninWithEmailRoute() {
  const router = useRouter();
  const authContext = useAuthContext();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({
    email,
    password,
  }) => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (user) {
        authContext?.loadUserSession();
        toast({
          title: "Authentication",
          description: "You have logged in successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.replace("/");
      }

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      reset({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Head>
        <title>Login | Login with email</title>
      </Head>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"outline"}
        p={8}
        mt={4}
      >
        <VStack>
          <Heading fontSize={"4xl"} textAlign="center">
            Login
          </Heading>
          <Text>Login with email and password</Text>
        </VStack>
        <Stack
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={4}
          mt={8}
          mb={6}
        >
          <FormControl id="email" isInvalid={Boolean(errors.email)}>
            <FormLabel>Email address</FormLabel>
            <Input type="email" {...register("email")} />
            {errors?.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="password" isInvalid={Boolean(errors.password)}>
            <FormLabel>Password</FormLabel>
            <Input type="password" {...register("password")} />
            {errors?.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button isLoading={isSubmitting} type="submit" colorScheme="purple">
            Login
          </Button>
        </Stack>
        <Link href={"/auth/login"} passHref>
          <Button as="a" variant={"link"} colorScheme="twitter" w="full">
            View other login options
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
