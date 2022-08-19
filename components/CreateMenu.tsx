import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFilePost } from "react-icons/bs";
export default function CreateMenu() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        rounded={"full"}
        icon={<Icon as={AiOutlinePlus} fontSize={"lg"} />}
        aria-label="Create Menu"
        size={"md"}
      ></MenuButton>
      <MenuList>
        <Link href="/create-post" passHref>
          <MenuItem as="a" icon={<BsFilePost size={24} />}>
            Create Post
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}
