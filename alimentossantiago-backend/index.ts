import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import multer from "multer";
import uploadRoutes from "./routes/upload.routes";
import paymentRoutes from './routes/payment';

// Importa tus rutas
import menuRoutes from "./routes/menuItems.routes";
import ordersRoutes from "./routes/orders.routes";

const app = express();
const PORT = 3001;

// 📸 Configuración de almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // ✅ Guarda en /uploads (no en public/uploads)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre único
  },
});

const upload = multer({ storage });

// Middlewares
app.use(cors({
  origin: "http://localhost:8080",
  credentials: true,
}));
app.use(express.json());

// Servir carpeta uploads como pública
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rutas principales
app.use("/menuItems", menuRoutes);
app.use("/orders", ordersRoutes);
app.use("/upload", uploadRoutes);
app.use('/api', paymentRoutes);

// Base de datos simulada de usuarios
const users = [
  { id: "1", name: "Admin", email: "admin", password: "admin", isAdmin: true },
  { id: "2", name: "Juan", email: "juan@mail.com", password: "1234", isAdmin: false },
];

// Rutas de auth
app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Email o contraseña incorrectos" });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

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

// Ruta de prueba
app.get("/", (req: Request, res: Response) => {
  res.send("Servidor Express funcionando 🚀");
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en https://localhost:${PORT}`);
});
