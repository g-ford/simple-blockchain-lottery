import React from "react";
import { Create, SimpleForm, TextInput, DateInput } from "react-admin";

import Typography from "@material-ui/core/Typography";

const Aside = () => (
  <div style={{ width: 200, margin: "1em" }}>
    <Typography variant="title">Creating a new Draw</Typography>
    <Typography variant="body1">
      Draws always start in the "PENDING" state.
    </Typography>
  </div>
);

export const DrawCreate: React.FC = props => {
  return (
    <Create {...props} aside={<Aside />}>
      <SimpleForm redirect="list">
        <TextInput source="id" />
        <DateInput source="start" />
        <DateInput source="end" />
      </SimpleForm>
    </Create>
  );
};
