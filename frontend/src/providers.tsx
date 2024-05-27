import { ChakraProvider } from "@chakra-ui/react";
import { TransactionProvider } from "./context/transaction";
import { theme } from "./libs/chakra-theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransactionProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </TransactionProvider>
  );
}
