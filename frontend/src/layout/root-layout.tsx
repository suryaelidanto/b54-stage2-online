import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "../components/sidebar/sidebar";
import { Outlet } from "react-router-dom";

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
        {/* <RightPanel /> */}
      </GridItem>
    </Grid>
  );
}

export default RootLayout;
