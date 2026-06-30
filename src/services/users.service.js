import { getDb } from "../config/db.js";

const COLLECTION = "users";

export async function getUserByEmail(email) {
  const db = await getDb();
  return db.collection(COLLECTION).findOne({ email });
}

export async function createUser(data) {
  const db = await getDb();
  const result = await db.collection(COLLECTION).insertOne(data);
  return { _id: result.insertedId, email: data.email };
}
