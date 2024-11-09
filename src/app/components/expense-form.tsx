"use client";
import { useRef } from "react";
import { ExpenseType } from "../types/expense";
import { EXPENSE_TYPES_OPTIONS } from "./constants";

function ExpenseForm() {
  const expenseTypeRef = useRef<ExpenseType>();
  const amountRef = useRef(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createExpense();
  };

  const createExpense = async () => {
    const response = await fetch("api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountRef.current,
        expenseType: expenseTypeRef.current,
        payer: "Hosty",
      }),
    });
    response
      .json()
      .then(() => {
        alert("Gasto creado!");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => window.location.reload());
  };

  return (
    <>
      <span>componente expense form</span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="expenseType">Tipo de gasto</label>
        <select
          id="expenseType"
          onChange={(e) =>
            (expenseTypeRef.current = e.target.value as ExpenseType)
          }
        >
          {EXPENSE_TYPES_OPTIONS.map((expenseTypeOption) => (
            <option
              key={expenseTypeOption.value}
              value={expenseTypeOption.value}
            >
              {expenseTypeOption.label}
            </option>
          ))}
        </select>
        <input
          id="amount"
          type="number"
          placeholder="Monto"
          onChange={(e) => (amountRef.current = Number(e.target.value))}
        />
        <button>Agregar</button>
      </form>
    </>
  );
}

export default ExpenseForm;
