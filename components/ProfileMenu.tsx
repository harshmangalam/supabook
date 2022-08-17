import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  HStack,
  Text,
} from "@chakra-ui/react";
import { RiSettingsLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuthContext } from "../context/auth";
export default function ProfileMenu() {
  const authContext = useAuthContext();
  return (
    <Menu>
      <MenuButton>
        <Avatar size={"sm"} src={authContext?.user?.avatar} />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <HStack spacing={4}>
            <Avatar size={"md"} src={authContext?.user?.avatar} />
            <Text fontWeight={"bold"}>{authContext?.user?.name}</Text>
          </HStack>
        </MenuItem>
        <MenuDivider />
        <MenuItem icon={<RiSettingsLine size={24} />}>Settings</MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={authContext?.logout}
          icon={<IoLogOutOutline size={24} />}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
