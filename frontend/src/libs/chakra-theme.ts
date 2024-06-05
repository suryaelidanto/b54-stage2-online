import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    primary: "#04A51E",
    secondary: "#005E0E",
  },
  error: {
    primary: "#ff0000",
  },
};

export const theme = extendTheme({ colors });
