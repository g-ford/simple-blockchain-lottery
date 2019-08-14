import React, { MouseEvent } from "react";
import { Button } from "@material-ui/core";
import LockOpen from "@material-ui/icons/LockOpen";
import { Mutation } from "react-admin";

const options = {
  undoable: false,
  onSuccess: {
    notification: {
      body: "Draw is now open",
      level: "info"
    },
    refresh: true
  },
  onError: {
    notification: {
      body: "Draw could not be opened",
      level: "warning"
    }
  }
};

const DrawActionB: React.FC = (props: any) => {
  if (props.record && props.record.status != "PENDING") return null;
  return (
    <Mutation
      type="OPEN"
      resource="draws"
      options={options}
      payload={{
        id: props.record.id
      }}
    >
      {(open: any) => (
        <Button onClick={open}>
          <LockOpen /> Open
        </Button>
      )}
    </Mutation>
  );
};

export default DrawActionB;
