import {
  Avatar,
  Button,
  Flex,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";
import ThemeMode from "./ThemeMode";

export default function Navbar() {
  return (
    <Flex
      as="nav"
      justify={"space-between"}
      py={4}
      borderBottomWidth="thin"
      h={16}
      align="center"
      px={4}
      position="fixed"
      top={0}
      left={0}
      right={0}
      background={useColorModeValue("white", "gray.800")}
      zIndex={"50"}
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
            <Button
              h={12}
              variant={"ghost"}
              rounded="lg"
              leftIcon={menu.icon}
              as="a"
            >
              {menu.name}
            </Button>
          </Link>
        ))}
      </HStack>

      <HStack spacing={4}>
        <ThemeMode />
        <NotificationMenu />
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
