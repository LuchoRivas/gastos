import { MongoClient } from "mongodb";

// anti explosivo
if (!process.env.MONGODB_URI) {
  throw new Error("Please add Mongo URI to your .env.local");
}

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
const clientPromise = client.connect();

export default clientPromise;
