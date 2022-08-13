import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import AppLayout from "../layouts/AppLayout";

export default function Home() {
  return <Button>Supabase</Button>;
}

Home.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
