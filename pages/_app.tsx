import { Box, ChakraProvider, useColorModeValue } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { theme } from "../theme";

export default function App({ Component, pageProps }: AppProps) {
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
