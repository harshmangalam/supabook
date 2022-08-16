import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFilePost } from "react-icons/bs";
export default function CreateMenu() {
  return (
    <Menu>
      <MenuButton>
        <IconButton
          rounded={"full"}
          icon={<Icon as={AiOutlinePlus} fontSize={"lg"} />}
          aria-label="Create Menu"
          size={"md"}
        />
      </MenuButton>
      <MenuList>
        <MenuItem icon={<BsFilePost size={24} />}>Create Post</MenuItem>
      </MenuList>
    </Menu>
  );
}
