import React from "react";
import { List, Datagrid, TextField, DateField, ChipField } from "react-admin";

export const DrawList: React.FC = props => (
  <List {...props} title="Draws">
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <DateField source="start" />
      <DateField source="end" />
      <ChipField source="status" />
    </Datagrid>
  </List>
);
