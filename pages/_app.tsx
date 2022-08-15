import { Box, ChakraProvider, useColorModeValue } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { theme } from "../theme";
import { supabase } from "../utils/supabaseClient";

export default function App({ Component, pageProps }: AppProps) {
  const session = supabase.auth.session()
  console.log(session)

  return (
    <ChakraProvider theme={theme}>
      <Box minH={"100vh"}>
        <Navbar />
        <Box as="main" py={20}>
          <Component {...pageProps} />
        </Box>
      </Box>
    </ChakraProvider>
  );
}
