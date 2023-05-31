const {
  Client,
  FileCreateTransaction,
  ContractCreateTransaction,
  PrivateKey,
  ContractFunctionParameters,
  ContractCallQuery,
  ContractExecuteTransaction,
  Hbar,
} = require('@hashgraph/sdk');
// const { AbiCoder } = require('ethers');
// const abiCoder = new AbiCoder();
require('dotenv').config({ path: '../.env' });

// const myAccountId = process.env.MY_ACCOUNT_ID;
const myAccountId = "0.0.13726204"
const myPrivateKey = PrivateKey.fromString(
  // process.env.MY_PRIVATE_KEY
  "302e020100300506032b657004220420577a099b3a7a62acf1457a9bbd3d6613fcbda05fe0e8572870e51f66e91f576b"
);

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

async function function1(newContractId) {
  const contractExecTx = await new ContractExecuteTransaction()
    //Set the ID of the contract
    .setContractId(newContractId)
    //Set the gas for the contract call
    .setGas(100000)
    //Set the contract function to call
    .setFunction(
      'function1',
      new ContractFunctionParameters().addUint16(4).addUint16(3)
    );

  //Submit the transaction to a Hedera network and store the response
  const submitExecTx = await contractExecTx.execute(client);

  //Get the receipt of the transaction
  const receipt2 = await submitExecTx.getReceipt(client);

  //Confirm the transaction was executed successfully
  console.log(
    'The transaction status is ' + receipt2.status.toString(),
    receipt2
  );
}

async function function2(newContractId) {
  const contractExecTx = await new ContractExecuteTransaction()
    //Set the ID of the contract
    .setContractId(newContractId)
    //Set the gas for the contract call
    .setGas(100000)
    //Set the contract function to call
    .setFunction(
      'function2',
      new ContractFunctionParameters().addUint16(12)
    );

  //Submit the transaction to a Hedera network and store the response
  const submitExecTx = await contractExecTx.execute(client);

  //Get the receipt of the transaction
  const receipt2 = await submitExecTx.getReceipt(client);

  //Confirm the transaction was executed successfully
  console.log(
    'The transaction status is ' + receipt2.status.toString(),
    receipt2
  );
}

async function abiDecode() {
  data =
    '0x000000000000000000000000000000000000000000000000000000000000000e';
  console.log(abiCoder.decode(['uint'], data));
}
function1('0.0.13726373');  //input 4,3 output 12
// function2('0.0.13726373'); /* input value 12 output 14 */
// abiDecode(); // output decode value == 14
