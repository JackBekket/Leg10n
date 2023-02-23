# Leg10n

# Idea

# Go artifacts
```
solc --abi --bin ./contracts/Leg10n.sol -o build ..=.. --overwrite --allow-paths *,/node_modules/,
abigen --abi="build/Leg10n.abi" --pkg=Leg10n --out="./go/leg10n.go"
```


This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
