import * as jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);

// Exponer cabeceras necesarias para React-Admin
server.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count, Link');
  next();
});

// Middleware para agregar X-Total-Count en listas
server.use((req, res, next) => {
  const send = res.send;
  res.send = function (body) {
    try {
      const url = req.originalUrl;
      const isGetList = req.method === 'GET' && body && Array.isArray(JSON.parse(body));

      if (isGetList && url.includes('/menuItems')) {
        const data = JSON.parse(body);
        res.setHeader('X-Total-Count', data.length);
      }
    } catch (err) {
      console.error('Error setting X-Total-Count:', err);
    }

    send.call(this, body);
  };
  next();
});

server.use(router);

server.listen(3001, () => {
  console.log('✅ JSON Server corriendo en http://localhost:3001');
});
