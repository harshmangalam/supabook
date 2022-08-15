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
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../utils/supabaseClient";
import { BsArrowRight } from "react-icons/bs";
const schema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();

export default function LoginWithMaginLinkRoute() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ email }) => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
      });

      setValue("email", "");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Authenticate</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Login With Magic Link
          </Text>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack as="form" noValidate onSubmit={handleSubmit(onSubmit)} spacing={4}>
            <FormControl id="email"  isInvalid={errors.email}>
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
              colorScheme="green"
            >
              Continue
            </Button>
          </Stack>
          <Link href={"/auth"} passHref>
            <Button
              as="a"
              variant={"link"}
              colorScheme="twitter"
              size="sm"
              mt={3}
              w="full"
            >
              View other login options
            </Button>
          </Link>
        </Box>
      </Stack>
    </Container>
  );
}
