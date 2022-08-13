import { IconButton, useColorMode } from "@chakra-ui/react";
import { CgSun, CgMoon } from "react-icons/cg";
export default function ThemeMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
      rounded={"full"}
      aria-label="Theme change"
      icon={colorMode === "dark" ? <CgSun size={24} /> : <CgMoon size={24} />}
    />
  );
}
