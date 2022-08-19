import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Button,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiNotification2Line } from "react-icons/ri";
export default function NotificationMenu() {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          rounded={"full"}
          aria-label="Notifications"
          icon={<Icon as={RiNotification2Line} fontSize={"lg"} />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Notifications</PopoverHeader>
        <PopoverBody>
          Notifications will available soon using supabase relatime
        </PopoverBody>
        <PopoverFooter>
          <Link href={"/"} passHref>
            <Button w="full" variant={"link"}>
              See all
            </Button>
          </Link>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
