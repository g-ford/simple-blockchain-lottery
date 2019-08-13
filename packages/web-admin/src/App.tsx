import React from "react";

import { Admin, Resource } from "react-admin";
import { LotteryAPI } from "./dataProviders/lotteryAPI";
import { DrawList, DrawCreate, DrawEdit } from "./components/draw";

const App: React.FC = () => {
  return (
    <Admin dataProvider={LotteryAPI}>
      <Resource
        name="draws"
        list={DrawList}
        edit={DrawEdit}
        create={DrawCreate}
      />
    </Admin>
  );
};

export default App;
