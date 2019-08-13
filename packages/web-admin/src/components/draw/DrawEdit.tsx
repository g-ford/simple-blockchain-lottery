import React from "react";
import { Edit, SimpleForm, DisabledInput, DateInput } from "react-admin";

export const DrawEdit: React.FC = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <DateInput source="start" />
      <DateInput source="end" />
    </SimpleForm>
  </Edit>
);
