import React from "react";
import { Create, SimpleForm, TextInput, DateInput } from "react-admin";

export const DrawCreate: React.FC = props => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="id" />
        <DateInput source="start" />
        <DateInput source="end" />
      </SimpleForm>
    </Create>
  );
};
