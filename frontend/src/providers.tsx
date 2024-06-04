import { ChakraProvider } from "@chakra-ui/react";
import { TransactionProvider } from "./context/transaction";
import { theme } from "./libs/chakra-theme";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <TransactionProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </TransactionProvider>
    </ReduxProvider>
  );
}
