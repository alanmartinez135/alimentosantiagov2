import { List, Datagrid, TextField, NumberField } from "react-admin";

export const OrderList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="userId" />
      <NumberField source="total" />
      <TextField source="status" />
      <TextField source="deliveryMethod" />
      <TextField source="deliveryAddress" />
      <TextField source="date" />
    </Datagrid>
  </List>
);
export default OrderList;
