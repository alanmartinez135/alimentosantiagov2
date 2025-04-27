import { loadDB, saveDB } from "../models/db";
import { Request, Response } from "express";


export const getMenuItems = async (req: Request, res: Response) => {
  const db = await loadDB();
  res.json(db.menuItems || []);
};

export const createMenuItem = async (req: Request, res: Response) => {
  const db = await loadDB();
  const nuevoItem = { ...req.body, id: Date.now().toString() };
  db.menuItems.push(nuevoItem);
  await saveDB(db);
  res.status(201).json(nuevoItem);
};

export const updateMenuItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await loadDB();
  const index = db.menuItems.findIndex((item: any) => item.id === id);
  if (index === -1) return res.status(404).send('No encontrado');
  db.menuItems[index] = { ...db.menuItems[index], ...req.body };
  await saveDB(db);
  res.json(db.menuItems[index]);
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await loadDB();
  db.menuItems = db.menuItems.filter((item: any) => item.id !== id);
  await saveDB(db);
  res.status(204).send();
};
