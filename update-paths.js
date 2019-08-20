const os = require("os");
const fs = require("fs");
const path = require("path");
const homedir = os.homedir();

console.log("Replacing references in config.json");
const configFilePath = path.join(__dirname, "./org1.simplelottery.config.json");
const configFilePath2 = path.join(
  __dirname,
  "./org2.simplelottery.config.json"
);

const configFile = require(configFilePath);
const configFile2 = require(configFilePath2);
fs.writeFileSync(
  configFilePath,
  JSON.stringify(
    {
      ...configFile,
      keyStore: configFile.keyStore.replace(
        /^.+\/hyperledger-fabric-network/,
        path.join(homedir, "hyperledger-fabric-network")
      ),
      networkProfile: configFile.networkProfile.replace(
        /^.+\/hyperledger-fabric-network/,
        path.join(homedir, "hyperledger-fabric-network")
      )
    },
    null,
    2
  )
);
fs.writeFileSync(
  configFilePath2,
  JSON.stringify(
    {
      ...configFile,
      keyStore: configFile.keyStore.replace(
        /^.+\/hyperledger-fabric-network/,
        path.join(homedir, "hyperledger-fabric-network")
      ),
      networkProfile: configFile.networkProfile.replace(
        /^.+\/hyperledger-fabric-network/,
        path.join(homedir, "hyperledger-fabric-network")
      )
    },
    null,
    2
  )
);

console.log("Paths updated successfully");

console.log("Updating explorer config");

const explorerConfigPath = path.join(
  __dirname,
  "./packages/explorer/network/connection-profile/first-network.json"
);
const explorerConfig = require(explorerConfigPath);

const org1Path =
  "artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/Admin@org1.hurley.lab/msp/keystore";
const org1Key = fs.readdirSync(
  path.join(homedir, "hyperledger-fabric-network/", org1Path)
)[0];
explorerConfig.organizations.org1MSP.adminPrivateKey.path = `/config/${org1Path}/${org1Key}`;

const org2Path =
  "artifacts/crypto-config/peerOrganizations/org2.hurley.lab/users/Admin@org2.hurley.lab/msp/keystore";
const org2Key = fs.readdirSync(
  path.join(homedir, "hyperledger-fabric-network/", org2Path)
)[0];
explorerConfig.organizations.org2MSP.adminPrivateKey.path = `/config/${org2Path}/${org2Key}`;

fs.writeFileSync(explorerConfigPath, JSON.stringify(explorerConfig));

console.log("Admin user keys updated");
