/* eslint-disable object-curly-spacing */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express, { Request, Response } from "express";

admin.initializeApp();
const db = admin.firestore();
const app = express();

app.use(express.json());

// 📘 READ user by ID
app.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const doc = await db.collection("users").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).send("User not found");
    return res.status(200).send(doc.data());
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
});

// 🟢 CREATE a new user
app.post("/user", async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const newUserRef = await db.collection("users").add(userData);
    return res.status(201).send({ id: newUserRef.id });
  } catch (error) {
    return res.status(500).send("Failed to create user");
  }
});

// 🟡 UPDATE an existing user
app.put("/user/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const userRef = db.collection("users").doc(userId);
    const doc = await userRef.get();
    if (!doc.exists) return res.status(404).send("User not found");

    await userRef.set(updatedData, { merge: true });
    return res.status(200).send("User updated successfully");
  } catch (error) {
    return res.status(500).send("Failed to update user");
  }
});

// 🔴 DELETE a user
app.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await db.collection("users").doc(userId).delete();
    return res.status(200).send("User deleted successfully");
  } catch (error) {
    return res.status(500).send("Failed to delete user");
  }
});

// 🌐 Export to Firebase Functions
exports.api = functions.https.onRequest(app);
