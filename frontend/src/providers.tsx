import { ChakraProvider } from "@chakra-ui/react";
import { TransactionProvider } from "./context/transaction";
import { theme } from "./libs/chakra-theme";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function Providers({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ReduxProvider store={store}>
        <TransactionProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </TransactionProvider>
      </ReduxProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
