import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Container,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../../utils/supabaseClient";
import { useRouter } from "next/router";
import Head from "next/head";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  })
  .required();

export default function AuthSignupRoute() {
  const router = useRouter();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({
    name,
    email,
    password,
  }) => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (user) {
        await supabase.from("profile").insert([
          {
            name,
            user_info: user,
            user_id: user.id,
          },
        ]);
        toast({
          title: "Authentication",
          description: "Your account created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/auth/login/login-with-email");
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Head>
        <title>Signup</title>
      </Head>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"outline"}
        p={8}
        mt={4}
      >
        <Heading fontSize={"4xl"} textAlign="center">
          Sign up
        </Heading>
        <Stack
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={4}
          mt={8}
          mb={6}
        >
          <FormControl id="name" isInvalid={Boolean(errors.name)}>
            <FormLabel>Name</FormLabel>
            <Input type="text" {...register("name")} />
            {errors?.name && (
              <FormErrorMessage>{errors.name.message}</FormErrorMessage>
            )}
          </FormControl>
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

          <Button isLoading={isSubmitting} type="submit" colorScheme="green">
            Sign up
          </Button>
        </Stack>
        <Link href={"/auth/login"} passHref>
          <Button as="a" variant={"link"} colorScheme="twitter" w="full">
            Login with existing account
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
