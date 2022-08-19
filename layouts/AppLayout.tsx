import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import BottomNav from "../components/BottomNav";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../context/auth";

interface Props {
  children: ReactElement;
}

export default function AppLayout({ children }: Props) {
  const authContext = useAuthContext();
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Box as="main" py={20}>
        {children}
      </Box>
      {!authContext?.user && (
        <Box display={["block", "none"]}>
          <BottomNav />
        </Box>
      )}
    </Box>
  );
}
