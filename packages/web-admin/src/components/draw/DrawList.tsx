import React from "react";
import { List, Datagrid, TextField, DateField, ChipField } from "react-admin";
import DrawAction from "./DrawAction";

export const DrawList: React.FC = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <DateField source="start" />
      <DateField source="end" />
      <ChipField source="status" />
      <DrawAction />
    </Datagrid>
  </List>
);
