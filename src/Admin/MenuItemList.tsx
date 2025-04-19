import { List, Datagrid, TextField, NumberField, EditButton, DeleteButton } from "react-admin";

export const MenuItemList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="description" />
      <NumberField source="price" />
      <TextField source="category" />
      <NumberField source="stock" />
      
      {/* Agregar botones de acción */}
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default MenuItemList;
