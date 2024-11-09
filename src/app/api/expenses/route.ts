import { Expense } from "@/app/types/expense";
import { NextResponse } from "next/server";

// ""Base de datos""
const expensesDB: Expense[] = [];

// Generador de IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Handler - obtener todos los gastos
export async function GET() {
  return NextResponse.json(expensesDB);
}

// Handler - crear un nuevo gasto
export async function POST(request: Request) {
    debugger
  const { expenseType, amount, payer } = await request.json();

  if (!expenseType || !amount || !payer) {
    return NextResponse.json(
      { error: "Faltan datos en la solicitud" },
      { status: 400 }
    );
  }

  // nuevo gasto
  const newExpense: Expense = {
    id: generateId(),
    expenseType,
    amount,
    payer,
    createdAt: new Date().toLocaleDateString("es-AR"),
    settled: true,
    sharedAmount: {
      userA: { amount: amount / 2, paid: payer === "UserA" },
      userB: { amount: amount / 2, paid: payer === "UserB" },
    },
  };

  // "base de datos"
  expensesDB.push(newExpense);

  return NextResponse.json(newExpense, { status: 201 });
}
