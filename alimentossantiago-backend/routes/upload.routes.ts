import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";

const router = Router();

// 📸 Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // ✅ Subir a /uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // ✅ Nombre único
  },
});

const upload = multer({ storage });

// 📥 Ruta para recibir imagen
router.post("/", upload.single("image"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se subió ninguna imagen" });
  }

  const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`; // URL completa
  res.json({ url: imageUrl });
});

export default router;
