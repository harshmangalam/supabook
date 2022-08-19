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
import Link from "next/link";
export default function ProfileMenu() {
  const authContext = useAuthContext();
  return (
    <Menu>
      <MenuButton aria-label="Profile Manu">
        <Avatar
          name={authContext?.user?.name}
          size={"sm"}
          src={authContext?.user?.avatar?.url}
        />
      </MenuButton>

      <MenuList>
        <Link href={`/${authContext?.user.id}`} passHref>
          <MenuItem as="a">
            <HStack spacing={4}>
              <Avatar
                name={authContext?.user?.name}
                size={"md"}
                src={authContext?.user?.avatar?.url}
              />
              <Text fontWeight={"bold"}>{authContext?.user?.name}</Text>
            </HStack>
          </MenuItem>
        </Link>
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
