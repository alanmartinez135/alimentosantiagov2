import { loadDB, saveDB } from "../models/db";
import { Request, Response } from "express";


export const getOrders = async (req: Request, res: Response) => {
  const db = await loadDB();
  res.json(db.orders || []);
};

export const createOrder = async (req: Request, res: Response) => {
  const db = await loadDB();
  const nuevaOrden = { ...req.body, id: Date.now().toString() };
  db.orders.push(nuevaOrden);
  await saveDB(db);
  res.status(201).json(nuevaOrden);
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await loadDB();
  const index = db.orders.findIndex((order: any) => order.id === id);
  if (index === -1) return res.status(404).send('No encontrado');
  db.orders[index] = { ...db.orders[index], ...req.body };
  await saveDB(db);
  res.json(db.orders[index]);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await loadDB();
  db.orders = db.orders.filter((order: any) => order.id !== id);
  await saveDB(db);
  res.status(204).send();
};
