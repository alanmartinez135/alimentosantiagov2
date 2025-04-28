import express, { Request, Response } from "express";
import cors from "cors";

// Importa tus rutas
import menuRoutes from "./routes/menuItems.routes";
import ordersRoutes from "./routes/orders.routes";

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Base de datos simulada de usuarios
const users = [
  { id: "1", name: "Admin", email: "admin", password: "admin", isAdmin: true },
  { id: "2", name: "Juan", email: "juan@mail.com", password: "1234", isAdmin: false },
];

// Rutas
app.use("/menuItems", menuRoutes);
app.use("/orders", ordersRoutes);

// Ruta de prueba
app.get("/", (req: Request, res: Response) => {
  res.send("Servidor Express funcionando 🚀");
});

// Ruta para login
app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Email o contraseña incorrectos" });
  }

  // No enviar password en la respuesta
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Ruta para crear nuevo usuario (registro)
app.post("/users", (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "El correo ya está registrado" });
  }

  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password,
    isAdmin: false,
  };
  users.push(newUser);

  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
