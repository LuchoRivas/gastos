type ExpenseType = "Luz" | "Agua" | "Internet" | "Gas" | "Alquiler";

type Expense = {
  id: string;
  expenseType: ExpenseType;
  ammount: number;
  payer: string;
  createdAt: string;
  settled: boolean;
  sharedAmmount: {
    userA: { ammount: number; paid: boolean };
    userB: { ammount: number; paid: boolean };
  };
};

export type { Expense, ExpenseType };
