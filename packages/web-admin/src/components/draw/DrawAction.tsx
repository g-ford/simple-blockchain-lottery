import React, { MouseEvent } from "react";
import { Button } from "@material-ui/core";
import LockOpen from "@material-ui/icons/LockOpen";
import { withDataProvider } from "react-admin";

// const DrawActionA: React.FC = ({ dataProvider, dispatch, record }: any) => {
//   const click = async (e: MouseEvent) => {
//     e.stopPropagation();

//     dataProvider(
//       "OPEN",
//       "draws",
//       {
//         id: record.id,
//         data: record
//       },
//       {
//         onSuccess: {
//           notification: {
//             body: `Draw ${record.id} is now open`,
//             level: "info"
//           },
//           refresh: true
//         },
//         onError: {
//           notification: {
//             body: `Draw ${record.id} could not be opened`,
//             level: "warning"
//           }
//         }
//       }
//     );
//   };

//   return (
//     <Button onClick={click}>
//       <LockOpen /> Open
//     </Button>
//   );
// };

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
  return (
    <Mutation
      type="OPEN"
      resource="draws"
      options={options}
      payload={{
        id: props.record.id
      }}
    >
      {(open: any) => <Button onClick={open}>Open</Button>}
    </Mutation>
  );
};

export default DrawActionB;
