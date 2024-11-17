import { fetchExpenses } from "../services/expense";
import { Expense } from "../types/expense";
import { FIXED_EXPENSE_TYPES_ROWS } from "./constants";



async function ExpenseList() {
  const getCurrentMoth = () => {
    const date = new Date();
    return date.toLocaleDateString("default", {
      month: "long",
      year: "numeric",
    });
  };
  const expenses: Expense[] = await fetchExpenses();
  
  const divideHalf = (ammountToDivide?: number) => {
    if (!ammountToDivide) return;
    return ammountToDivide / 2;
  };

  return (
    <div>
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
                      ? // ? divideHalf(
                        expenses.find(
                          (expense) => expense.expenseType === expenseTypeRow
                        )?.amount
                      : // )
                        "No cargado" // Mensaje por defecto
                  }
                  <p>
                    {divideHalf(
                      expenses.find(
                        (expense) => expense.expenseType === expenseTypeRow
                      )?.amount
                    )}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseList;
