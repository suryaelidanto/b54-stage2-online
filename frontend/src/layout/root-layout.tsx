import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "../components/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { SuggestionTab } from "@/features/right-bar/components/suggestion-tab";

function RootLayout() {
  return (
    <Grid templateColumns="20% 50% 30%" bg="#1D1D1D">
      <GridItem w="100%">
        <Sidebar />
      </GridItem>
      <GridItem w="100%">
        <Outlet />
      </GridItem>
      <GridItem w="100%">
        <SuggestionTab />
      </GridItem>
    </Grid>
  );
}

export default RootLayout;
