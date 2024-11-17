import clientPromise from "@/app/lib/mongo";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const CLIENT_DB = "gastosDB";
const CLIENT_COLLECTION = "gastos";

// Generador de IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Handler - obtener todos los gastos
export async function GET() {
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

// Handler - editar un gasto
export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(CLIENT_DB);
    const { id, ...updatedData } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID del gasto es requerido" }, { status: 400 });
    }

    const result = await db.collection(CLIENT_COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "No se encontro el gasto para actualizar" }, { status: 404 });
    }

    return NextResponse.json({ message: "Gasto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el gasto:", error);
    return NextResponse.json({ error: "Error al actualizar el gasto" }, { status: 500 });
  }

}
