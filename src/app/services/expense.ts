// services/updateExpense.ts
import { ExpenseType } from "../types/expense";

export async function updateExpense(
  id: string,
  updatedData: { expenseType?: string; amount?: number; payerId?: string }
) {
  const response = await fetch("/api/expenses", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...updatedData }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al actualizar el gasto");
  }

  return response.json();
}

export async function fetchExpenses() {
  const response = await fetch(`${process.env.NEXT_BASE_URL}/api/expenses`);
  return await response.json();
}

export async function createExpense(amount: number, expenseType: ExpenseType) {
  const response = await fetch("api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      expenseType,
      payer: "Hosty",
    }),
  });
  response
    .json()
    .then(() => {
      alert("Gasto creado!");
    })
    .catch((error) => {
      console.error(error || "error!");
    })
    .finally(() => window.location.reload());
}
