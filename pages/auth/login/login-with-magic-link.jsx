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
  FormHelperText,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../../utils/supabaseClient";
import { BsArrowRight } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";
import Head from "next/head";
const schema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();

export default function SigninSigninWithMagicLinkRoute() {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ email }) => {
    try {
      const { error, session, user, provider, url } =
        await supabase.auth.signIn({
          email,
        });

      if (error) {
        toast({
          title: "Sign in",
          description: error?.message,
          status: "error",
          isClosable: true,
        });
        return;
      }

      setValue("email", "");
      toast({
        title: "Sign in",
        description: "Magin link sent to your email successfully",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Head>
        <title>Login | Login with magic link</title>
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
          <Text>Login with magic link</Text>
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
            {errors?.email ? (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            ) : (
              <FormHelperText>
                Magic link will be sent to your email address
              </FormHelperText>
            )}
          </FormControl>

          <Button
            isLoading={isSubmitting}
            rightIcon={<BsArrowRight size={20} />}
            type="submit"
            colorScheme="pink"
          >
            Continue
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
