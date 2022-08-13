import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";

export default function Navbar() {
  return (
    <Flex as="nav" justify={"space-between"}>
      {/* logo  */}
      <Avatar
        width={40}
        height={40}
        src="https://marketplace-assets.digitalocean.com/logos/supabase-supabasepostgres-18-04.svg"
      />

      {/* menu links  */}

      <HStack>
        <Box>
          <Tooltip label="Home">
            <IconButton
              icon={<AiOutlineHome size={32} />}
              aria-label="Home"
              size={"lg"}
            />
          </Tooltip>
        </Box>
      </HStack>

      <HStack></HStack>
    </Flex>
  );
}
