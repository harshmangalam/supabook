import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "../components/Navbar";
export default function AppLayout({ children }) {
  return (
    <Box>
      <Navbar />
      <Box as="main">{children}</Box>
      <Box as="footer"></Box>
    </Box>
  );
}
