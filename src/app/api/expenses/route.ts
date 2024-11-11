import clientPromise from "@/app/lib/mongo";
import { NextResponse } from "next/server";

const CLIENT_DB = "gastosDB";
const CLIENT_COLLECTION = "gastos";

// Generador de IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Handler - obtener todos los gastos
export async function GET() {
  debugger;
  const client = await clientPromise;
  const db = client.db(CLIENT_DB);
  const expenses = await db.collection(CLIENT_COLLECTION).find({}).toArray();
  console.log(NextResponse.json(expenses));
  return NextResponse.json(expenses);
}

// Handler - crear un nuevo gasto
export async function POST(request: Request) {
  const { expenseType, amount, payer } = await request.json();

  if (!expenseType || !amount || !payer) {
    return NextResponse.json(
      { error: "Faltan datos en la solicitud" },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db(CLIENT_DB);

    // nuevo gasto db
    const newExpense = {
      expenseType: expenseType,
      amount: amount,
      createdAt: new Date(),
      payer: process.env.NODE_ENV === "development" && "Hosty",
      settled: true,
      // no se si usar esto aun
      // sharedAmount: {
      //   userA: { amount: amount / 2, paid: payer === "UserA" },
      //   userB: { amount: amount / 2, paid: payer === "UserB" },
      // },
    };

    const result = await db.collection(CLIENT_COLLECTION).insertOne(newExpense);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error || "Error al crear el gasto" },
      { status: 500 }
    );
  }
}
