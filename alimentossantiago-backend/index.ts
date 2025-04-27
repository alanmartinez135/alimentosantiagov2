import express, { Request, Response } from "express";
import cors from "cors";

// Importa tus rutas (ahora las armamos si quieres)
import menuRoutes from "./routes/menuItems.routes";
import ordersRoutes from "./routes/orders.routes";

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/menuItems", menuRoutes);
app.use("/orders", ordersRoutes);

// Ruta de prueba
app.get("/", (req: Request, res: Response) => {
  res.send("Servidor Express funcionando 🚀");
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
