import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
export default function PostAction() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Actions"
        icon={<Icon as={BiDotsHorizontalRounded} fontSize="lg" />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<AiOutlineDelete size={20} />}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
