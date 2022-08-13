import { Avatar, Box, Flex } from "@chakra-ui/react";

export default function AppLayout({ children }) {
  return (
    <Box>
      <Flex as="nav">
        {/* logo  */}
        <Avatar src="https://supabase.com/docs/supabase-dark.svg" />
      </Flex>
      <Box as="main">{children}</Box>
      <Box as="footer"></Box>
    </Box>
  );
}
