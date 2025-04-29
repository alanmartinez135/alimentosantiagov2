import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../../db.json'); // Asegúrate que este path sea correcto

// Estructura inicial si el archivo no existe
const initialDB = {
  menuItems: [],
  orders: []
};

export const loadDB = async () => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // Si no existe, crearlo con la estructura inicial
      await saveDB(initialDB);
      return initialDB;
    } else {
      throw error;
    }
  }
};

export const saveDB = async (db: any) => {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');
};
