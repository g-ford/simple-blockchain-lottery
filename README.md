# simple-blockchain-lottery

This is a sample Hyperledger Fabric based project to simulate a simple lottery running on the blockchain with several parties involved:

- a private organisation running the lottery
- government regulator
- resellers
- retailers

| **Warning** | this is a work in progress and a proof of concept only. The lottery code itself is not robust or conforming to an regulatory standards. |
| ----------- | :-------------------------------------------------------------------------------------------------------------------------------------- |


# Components

TODO: make an architectural diagram with the following components:

- Hyperledger Fabric blockchain
  - including orgainisations in concensus
- GraphQL API
- Administration Website
- Retail Website

# Start

```
# Install dependencies - From the root of your project
npm i
# Create a new development blockchain network  - From the root of your project
npm run env:restart
# Install your smart contract
npm run cc:start -- simplelottery
# Make a testing call to create a record in the ledger
# Beware that the first call may fail with a timeout! Just happens the first time
npx hurl invoke simplelottery draw_getAll

# start the other components - API, frontend and admin
npm run start
```

### Bring your project to life

```
# Install dependencies - From the root of your project
npm i
# Create a new development blockchain network  - From the root of your project
npm run env:restart
```

### Install and upgrade chaincodes

```
# Install to your blockchain - From the root of your project
npm run cc:start -- simplelottery

# Upgrade your existing chaincode - From the root of your project
npm run cc:upgrade -- simplelottery 1.2
```

## Tests

```
npm run test
```
