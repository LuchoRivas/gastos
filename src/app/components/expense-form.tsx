"use client";
import { useRef } from "react";
import { ExpenseType } from "../types/expense";
import { EXPENSE_TYPES_OPTIONS } from "./constants";
import { createExpense } from "../services/expense";

function ExpenseForm() {
  const expenseTypeRef = useRef<ExpenseType>();
  const amountRef = useRef(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amountRef.current <= 0 || !expenseTypeRef.current) return;
    createExpense(amountRef.current, expenseTypeRef.current);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="expenseType">Tipo de gasto</label>
      <select
        id="expenseType"
        onChange={(e) =>
          (expenseTypeRef.current = e.target.value as ExpenseType)
        }
      >
        {EXPENSE_TYPES_OPTIONS.map((expenseTypeOption) => (
          <option key={expenseTypeOption.value} value={expenseTypeOption.value}>
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
  );
}

export default ExpenseForm;
