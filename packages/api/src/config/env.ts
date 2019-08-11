import * as dotenv from "dotenv";
dotenv.config();

const homedir = require("os").homedir();

export const chaincode = process.env.CHAINCODE || "simplelottery";
export const channel = process.env.CHANNEL || "ch1";

// Automatically extract credentials by the user id
// If no .env config is found, fallback to Hurley defaults
export const identityId = process.env.IDENTITYID || "gov";
export const identityName = process.env.IDENTITY || "admin";
export const identityOrg = process.env.ORG || "org1";

export const keyStore =
  process.env.KEYSTORE ||
  `/${homedir}/hyperledger-fabric-network/.hfc-${identityOrg}`;
export const networkProfile =
  process.env.NETWORKPROFILE ||
  `/${homedir}/hyperledger-fabric-network/network-profiles/${identityOrg}.network-profile.yaml`;

export const port = process.env.PORT || 5000;
