import { useEffect, useState } from 'react';

function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/hola')
      .then((res) => res.json())
      .then((data) => setMensaje(data.mensaje))
      .catch((error) => {
        console.error('Error al conectar con el backend:', error);
        setMensaje('Error al conectar con el backend');
      });
  }, []);

  return (
    <div className="p-4 text-center text-lg">
      <h1>Frontend React</h1>
      <p>Mensaje del backend: {mensaje}</p>
    </div>
  );
}

export default App;
