import { HStack, Icon, IconButton, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";

export default function BottomNav() {
  return (
    <HStack
      as="nav"
      justify={"space-between"}
      h={16}
      px={4}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      background={useColorModeValue("white", "gray.800")}
      zIndex={"50"}
      borderTopWidth="2px"
    >
      {tabs.map((tab) => (
        <Link key={tab.name} href={tab.href} passHref>
          <IconButton
            variant={"ghost"}
            icon={<Icon fontSize={"24px"} as={tab.icon} />}
            aria-label={tab.name}
            as="a"
          />
        </Link>
      ))}
    </HStack>
  );
}

const tabs = [
  {
    icon: AiOutlineHome,
    name: "Home",
    href: "/",
  },
  {
    icon: BsPeople,
    name: "Friends",
    href: "/friends",
  },
];
