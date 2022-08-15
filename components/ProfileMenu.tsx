import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Avatar,
  HStack,
  Text,
} from "@chakra-ui/react";
import { RiSettingsLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
export default function ProfileMenu() {
  return (
    <Menu>
      <MenuButton>
        <Avatar size={"sm"} />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <HStack spacing={4}>
            <Avatar size={"md"} />
            <Text fontWeight={"bold"}>@harshdev8218</Text>
          </HStack>
        </MenuItem>
        <MenuDivider />
        <MenuItem icon={<RiSettingsLine size={24} />}>Settings</MenuItem>
        <MenuDivider />
        <MenuItem icon={<IoLogOutOutline size={24} />}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
