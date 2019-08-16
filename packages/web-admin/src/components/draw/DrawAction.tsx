import React from "react";
import { Button } from "@material-ui/core";
import LockOpen from "@material-ui/icons/LockOpen";
import LockClosed from "@material-ui/icons/Lock";
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
    },
    refresh: true
  }
};

const DrawAction: React.FC = (props: any) => {
  if (props.record && props.record.status === "PENDING") {
    return <DrawActionOpen {...props} />;
  }

  if (props.record && props.record.status === "OPEN") {
    return <DrawActionClose {...props} />;
  }

  return null;
};

const DrawActionOpen: React.FC = (props: any) => {
  return (
    <Mutation
      type="NEXT"
      resource="draws"
      options={options}
      payload={{
        id: props.record.id,
        currentStatus: props.record.status
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

const DrawActionClose: React.FC = (props: any) => {
  return (
    <Mutation
      type="NEXT"
      resource="draws"
      options={options}
      payload={{
        id: props.record.id,
        currentStatus: props.record.status
      }}
    >
      {(open: any) => (
        <Button onClick={open}>
          <LockClosed /> Close
        </Button>
      )}
    </Mutation>
  );
};

export default DrawAction;
