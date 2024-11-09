import { ExpenseType } from "../types/expense";

const EXPENSE_TYPES_OPTIONS: { value: ExpenseType | ""; label: string }[] = [
  {
    value: "",
    label: "Select",
  },
  {
    value: "Luz",
    label: "Luz",
  },
  { value: "Agua", label: "Agua" },
  { value: "Internet", label: "Internet" },
  { value: "Gas", label: "Gas" },
  { value: "Alquiler", label: "Alquiler" },
];
const FIXED_EXPENSE_TYPES_ROWS: ExpenseType[] = [
    "Agua",
    "Alquiler",
    "Gas",
    "Internet",
    "Luz",
  ];
export { EXPENSE_TYPES_OPTIONS, FIXED_EXPENSE_TYPES_ROWS };
