type ExpenseType = "Luz" | "Agua" | "Internet" | "Gas" | "Alquiler";

type Expense = {
  // id: string; // generado autom.
  expenseType: ExpenseType;
  amount: number;
  payer: string;
  createdAt: string;
  settled: boolean;
  sharedAmount?: {
    userA: { amount: number; paid: boolean };
    userB: { amount: number; paid: boolean };
  };
};

export type { Expense, ExpenseType };
