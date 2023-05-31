const {
  Client,
  Hbar,
  PrivateKey,
  AccountAllowanceApproveTransaction,
} = require('@hashgraph/sdk');

require('dotenv').config({ path: '../.env' });

const myAccountId = '0.0.13726204';
const myPrivateKey = PrivateKey.fromString(
  '302e020100300506032b657004220420577a099b3a7a62acf1457a9bbd3d6613fcbda05fe0e8572870e51f66e91f576b'
);

const myAccountId2 = '0.0.13726273';
const myPrivateKey2 = PrivateKey.fromString(
  '302e020100300506032b65700422042047564ded866b5f98c8782c45d38fb210aa1dc92a2fe9c9944f0f86ffc015c35c'
);
console.log(myAccountId, myAccountId2);

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

const client2 = Client.forTestnet();
client2.setOperator(myAccountId2, myPrivateKey2);

async function approveAllowance() {
  // Create the transaction
  const transaction = new AccountAllowanceApproveTransaction()
    .approveHbarAllowance(myAccountId, myAccountId2, Hbar.from(35))
    .freezeWith(client);
  //Sign the transaction with the owner account key
  const signTx = await transaction.sign(myPrivateKey);
  //Sign the transaction with the client operator private key and submit to a Hedera network
  const txResponse = await signTx.execute(client);
  //Request the receipt of the transaction
  const receipt = await txResponse.getReceipt(client);
  //Get the transaction consensus status
  const transactionStatus = receipt.status;
  console.log(
    'The transaction consensus status is ' +
      transactionStatus.toString()
  );
}

approveAllowance();
