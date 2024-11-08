"use client"
import { useRef } from "react";
import { ExpenseType } from "../types/expense";

const EXPENSE_TYPES: { value: ExpenseType; label: string }[] = [
  {
    value: "Luz",
    label: "Luz",
  },
  { value: "Agua", label: "Agua" },
  { value: "Internet", label: "Internet" },
  { value: "Gas", label: "Gas" },
  { value: "Alquiler", label: "Alquiler" },
];

function ExpenseForm() {
  const expenseTypeRef = useRef<ExpenseType>();
  const amountRef = useRef(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("eve", e);
    console.log("amountRef", amountRef);
    console.log("expenseTypeRef", expenseTypeRef);
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
          {EXPENSE_TYPES.map((expenseTypeOption) => (
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
