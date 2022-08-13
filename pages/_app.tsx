import { Box, ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { theme } from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Navbar />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}
