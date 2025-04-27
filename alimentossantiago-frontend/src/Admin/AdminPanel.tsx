import { Admin, Resource } from "react-admin";
import { Route } from "react-router-dom";  // Si no estás usando React Router 6, reemplaza por `import { Route } from 'react-router'`
import jsonServerProvider from "ra-data-json-server";
import { MenuItemList } from "./MenuItemList"; // Componente para mostrar los menuItems
import { OrderList } from "./OrderList"; // Componente para mostrar los pedidos

const dataProvider = jsonServerProvider("http://localhost:3001");

const AdminPanel = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="menuItems" list={MenuItemList} />
      <Resource name="orders" list={OrderList} />
    </Admin>
  );
};

export default AdminPanel;
