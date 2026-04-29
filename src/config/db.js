import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "AH20232CP1";

if (!uri) {
  throw new Error("Falta la variable MONGODB_URI en el archivo .env");
}

const client = new MongoClient(uri);
let isConnected = false;

export async function getDb() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }

  return client.db(dbName);
}
