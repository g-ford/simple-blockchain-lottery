import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import { Button, Chip } from "@material-ui/core";
import LockOpen from "@material-ui/icons/LockOpen";
import LockClosed from "@material-ui/icons/Lock";
import DrawIcon from "@material-ui/icons/Gavel";
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

  if (props.record && props.record.status === "CLOSED") {
    return <DrawActionDraw {...props} />;
  }

  if (props.record && props.record.status === "DRAWN") {
    return <DrawActionResult {...props} />;
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

const DrawActionDraw: React.FC = (props: any) => {
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
          <DrawIcon /> Draw Numbers
        </Button>
      )}
    </Mutation>
  );
};

const DrawActionResult: React.FC = (props: any) => {
  const classes: any = useStyles();
  return (
    <Fragment>
      Results:{" "}
      {props.record.results.numbers.map((n: number) => {
        return <div className={classes.ball}>{n}</div>;
      })}
    </Fragment>
  );
};

const useStyles = makeStyles({
  ball: {
    display: "inline-block",
    width: "2em",
    marginRight: "0.25em",
    height: "2em",
    lineHeight: "2em",
    borderRadius: "50%",
    color: "white",
    textAlign: "center",
    verticalAlign: "middle",
    background:
      "radial-gradient(circle at 65% 15%, white 1px, aqua 3%, darkblue 60%, aqua 100%)"
  }
});

export default DrawAction;
