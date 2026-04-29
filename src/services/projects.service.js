import { ObjectId } from "mongodb";
import { getDb } from "../config/db.js";

const COLLECTION = "projects";

export async function getAllProjects(filters = {}) {
  const db = await getDb();
  return db.collection(COLLECTION).find(filters).toArray();
}

export async function getProjectById(id) {
  const db = await getDb();
  const _id = new ObjectId(id);
  return db.collection(COLLECTION).findOne({ _id });
}

export async function getProjectsByClientId(clientObjectId) {
  const db = await getDb();
  return db
    .collection(COLLECTION)
    .find({ clientId: clientObjectId })
    .toArray();
}

export async function createProject(data) {
  const db = await getDb();
  const result = await db.collection(COLLECTION).insertOne(data);
  return { _id: result.insertedId, ...data };
}

export async function updateProject(id, data) {
  const db = await getDb();
  const _id = new ObjectId(id);
  const updated = await db.collection(COLLECTION).findOneAndUpdate(
    { _id },
    { $set: data },
    { returnDocument: "after" },
  );

  return updated;
}

export async function deleteProject(id) {
  const db = await getDb();
  const _id = new ObjectId(id);
  const result = await db.collection(COLLECTION).deleteOne({ _id });
  return result.deletedCount;
}
