import { ChakraProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import AuthProvider from "../context/auth";
import AppLayout from "../layouts/AppLayout";
import { theme } from "../theme";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <SWRConfig>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </SWRConfig>
      </AuthProvider>
    </ChakraProvider>
  );
}
