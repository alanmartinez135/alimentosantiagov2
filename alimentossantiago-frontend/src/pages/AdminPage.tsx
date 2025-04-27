// src/pages/AdminPage.tsx
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { MenuItemList } from "@/Admin/MenuItemList";
import { OrderList } from "@/Admin/OrderList";

const dataProvider = jsonServerProvider("http://localhost:3001");

const AdminPage = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="menuItems" list={MenuItemList} />
      <Resource name="sampleOrders" list={OrderList} />
    </Admin>
  );
};

export default AdminPage;
