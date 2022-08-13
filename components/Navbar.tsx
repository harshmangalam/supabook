import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";

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

      <HStack spacing={2} flexGrow={1} justify="center">
        {menus.map((menu) => (
          <Button leftIcon={menu.icon}>{menu.name}</Button>
        ))}
      </HStack>

      <HStack></HStack>
    </Flex>
  );
}

const menus = [
  {
    icon: <AiOutlineHome size={24} />,
    name: "Home",
    href: "/",
  },
  {
    icon: <BsPeople size={24} />,
    name: "Friends",
    href: "/friends",
  },
];
