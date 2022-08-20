import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { theme } from "../theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Social media web app build with Supabase and Nextjs"
          />
          <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
