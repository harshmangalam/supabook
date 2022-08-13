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
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  return (
    <Flex
      as="nav"
      justify={"space-between"}
      py={4}
      borderBottomWidth="thin"
      px={4}
    >
      {/* logo  */}
      <Avatar
        size={"md"}
        background="transparent"
        src="https://marketplace-assets.digitalocean.com/logos/supabase-supabasepostgres-18-04.svg"
      />

      {/* menu links  */}

      <HStack spacing={4} flexGrow={1} justify="center">
        {menus.map((menu) => (
          <Link href={menu.href} passHref>
            <Button variant={"outline"} leftIcon={menu.icon} as="a">
              {menu.name}
            </Button>
          </Link>
        ))}
      </HStack>

      <HStack>
        <ProfileMenu />
      </HStack>
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
