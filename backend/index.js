const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

const frontendPath = path.resolve(__dirname, '../frontend/dist');

app.use(express.static(frontendPath));
app.use(express.json());

// Ruta API
app.get('/api/hola', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend' });
});

// Para SPA (Single Page App) – redirige todo lo demás al frontend
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendPath, 'index.html'));
  } else {
    next();
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
