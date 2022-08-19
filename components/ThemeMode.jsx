import { Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { CgSun, CgMoon } from "react-icons/cg";
export default function ThemeMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
      rounded={"full"}
      aria-label="Theme change"
      icon={<Icon as={colorMode === "dark" ? CgSun : CgMoon} fontSize={"lg"} />}
    />
  );
}
