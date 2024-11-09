import { Expense } from "../types/expense";
import { FIXED_EXPENSE_TYPES_ROWS } from "./constants";

const fetchExpenses = async () => {
  const response = await fetch(`${process.env.NEXT_BASE_URL}/api/expenses`);
  // datos de `expenses`
  return await response.json();
};

async function ExpenseList() {
  const getCurrentMoth = () => {
    const date = new Date();
    return date.toLocaleDateString("default", {
      month: "long",
      year: "numeric",
    });
  };
  const expenses: Expense[] = await fetchExpenses();
  
  return (
    <>
      <span>componente expense list</span>
      <div>
        {/* titulo */}
        {getCurrentMoth()}
      </div>
      <div>
        {/* listado */}
        <table>
          <thead>
            <tr>
              {/* titulos */}
              <th>tipo de gasto</th>
              <th>monto</th>
            </tr>
          </thead>
          <tbody>
            {FIXED_EXPENSE_TYPES_ROWS.map((expenseTypeRow) => (
              <tr key={expenseTypeRow}>
                {/* tipo de expensa */}
                <td>{expenseTypeRow}</td>
                <td>
                  {
                    expenses.find(
                      (expense) => expense.expenseType === expenseTypeRow
                    )
                      ? expenses.find(
                          (expense) => expense.expenseType === expenseTypeRow
                        )?.amount
                      : "No cargado" // Mensaje por defecto
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ExpenseList;
