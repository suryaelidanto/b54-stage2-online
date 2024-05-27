import { createContext, useState } from "react";

interface Transaction {
  id: number;
  name: string;
  price: number;
  qty: number;
}

type TransactionContextType = {
  transactions: Transaction[];
  addNewTransaction: (transaction: Transaction) => void;
};

export const TransactionContext = createContext<TransactionContextType | null>(
  null
);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addNewTransaction = (newTransaction: Transaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addNewTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
