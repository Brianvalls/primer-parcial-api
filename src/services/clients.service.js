import { ObjectId } from "mongodb";
import { getDb } from "../config/db.js";

const COLLECTION = "clients";

export async function getAllClients() {
  const db = await getDb();
  return db.collection(COLLECTION).find({}).toArray();
}

export async function getClientById(id) {
  const db = await getDb();
  const _id = new ObjectId(id);
  return db.collection(COLLECTION).findOne({ _id });
}

export async function createClient(data) {
  const db = await getDb();
  const result = await db.collection(COLLECTION).insertOne(data);
  return { _id: result.insertedId, ...data };
}

export async function updateClient(id, data) {
  const db = await getDb();
  const _id = new ObjectId(id);
  const updated = await db.collection(COLLECTION).findOneAndUpdate(
    { _id },
    { $set: data },
    { returnDocument: "after" },
  );

  return updated;
}

export async function deleteClient(id) {
  const db = await getDb();
  const _id = new ObjectId(id);
  const result = await db.collection(COLLECTION).deleteOne({ _id });
  return result.deletedCount;
}
