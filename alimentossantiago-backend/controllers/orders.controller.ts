import { loadDB, saveDB } from "../models/db";
import { Request, Response } from "express";


export const getOrders = async (req: Request, res: Response) => {
  const db = await loadDB();
  res.json(db.orders || []);
};

export const getOrdersByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const db = await loadDB();

  const userOrders = db.orders.filter((order: any) => order.userId === userId);
  res.json(userOrders);
};

export const createOrder = async (req: Request, res: Response) => {
  const db = await loadDB();
  const { userId, items, total, deliveryMethod, deliveryAddress } = req.body;

  // Convertir items para que solo guarden el id y cantidad
  const cleanItems = items.map((item: any) => ({
    menuItemId: item.menuItem?.id || item.menuItemId,
    quantity: item.quantity,
  }));

  const newOrder = {
    id: Date.now().toString(),
    userId,
    items: cleanItems,
    total,
    status: "pending",
    date: new Date().toISOString(),
    deliveryMethod,
    deliveryAddress,
  };

  db.orders.push(newOrder);
  await saveDB(db);
  res.status(201).json(newOrder);
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
