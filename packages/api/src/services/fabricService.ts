import { join, resolve } from "path";
import {
  keyStore,
  identityName,
  channel,
  chaincode,
  networkProfile,
  identityId
} from "../config/env";
import * as fs from "fs";
import { FabricControllerAdapter } from "@worldsibu/convector-adapter-fabric";
import { ClientFactory } from "@worldsibu/convector-core";

import { DrawController } from "simplelottery-cc";
import { log } from "../config";
import { EntryController } from "simplelottery-cc/src";

const adapter = new FabricControllerAdapter({
  txTimeout: 300000,
  user: identityName,
  channel,
  chaincode,
  keyStore: resolve(__dirname, keyStore),
  networkProfile: resolve(__dirname, networkProfile)
  // userMspPath: keyStore
});

export const initAdapter = adapter.init();
export const DrawService: any = ClientFactory(DrawController, adapter);
export const EntryService: any = ClientFactory(EntryController, adapter);

async function checkService() {
  await initAdapter;
  const contextPath = join(keyStore + "/" + identityName);
  fs.readFile(contextPath, "utf8", async function(err, data) {
    if (err) {
      throw new Error(
        `Context in ${contextPath} doesn't exist. Make sure that path resolves to your key stores folder`
      );
    } else {
      log.debug(
        "Connection to Fabric looks good. Context path with cryptographic materials exists"
      );
    }
  });
}

checkService();
