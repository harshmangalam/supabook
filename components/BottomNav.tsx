import { HStack, Icon, IconButton, Tooltip, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineHome,AiOutlinePlus } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";

export default function BottomNav() {
  return (
    <HStack
      as="nav"
      justify={"space-between"}
      py={4}
      borderBottomWidth="thin"
      h={16}
      align="center"
      px={4}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      background={useColorModeValue("white", "gray.800")}
      zIndex={"50"}
    >
      {tabs.map(tab=>(
        <Link href={tab.href} passHref>
          <Tooltip label={tab.name}>
            <IconButton icon={<Icon as={tab.icon}/>} aria-label={tab.name} />
          </Tooltip>
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
  {
    icon: AiOutlinePlus,
    name: "Create Post",
    href: "/create-post",
  },

 
];
