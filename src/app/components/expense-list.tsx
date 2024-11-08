"use client";
import { useRef } from "react";
import { ExpenseType } from "../types/expense";

const FIXED_EXPENSE_TYPES: ExpenseType[] = [
  "Agua",
  "Alquiler",
  "Gas",
  "Internet",
  "Luz",
];

function ExpenseList() {
  const getCurrentMoth = () => {
    const date = new Date();
    return date.toLocaleDateString("default", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <span>componente expense list</span>
      <div>
        {/* titulo */}
        {getCurrentMoth()}
      </div>
      <div>{/* listado */}

        <table>
          <thead>
            <tr>
              <th>
                tipo de gasto
              </th>
              <th>
                monto
              </th>
            </tr>
          </thead>
          <tbody>
            {
              FIXED_EXPENSE_TYPES.map((expenseType) => (
                <tr key={expenseType}>
                  <td>
                    {expenseType}
                  </td>
                  <td>
                    <span>
                      No fue cargado
                    </span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ExpenseList;
