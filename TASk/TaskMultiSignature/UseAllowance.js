const {
  Client,
  AccountBalanceQuery,
  TransferTransaction,
  Hbar,
  PrivateKey,
  AccountCreateTransaction,
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

const myAccountId3 = "0.0.13726274";
const myPrivateKey3 = "302e020100300506032b65700422042047564ded866b5f98c8782c45d38fb210aa1dc92a2fe9c9944f0f86ffc015c35c";

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

const client2 = Client.forTestnet();
client2.setOperator(myAccountId2, myPrivateKey2);

async function UseAllowance() {
  const transaction = new TransferTransaction()
    .addApprovedHbarTransfer(myAccountId, new Hbar(-20))
    .addApprovedHbarTransfer(myAccountId3, new Hbar(20));
  console.log(
    `Doing transfer from ${myAccountId} to ${myAccountId3}`
  );
  const txId = await transaction.execute(client2);
  const receipt = await txId.getReceipt(client2);
  const transactionStatus = receipt.status;
  console.log(
    'The transaction consensus status is ' + transactionStatus
  );
  // Create the queries
  const queryMine = new AccountBalanceQuery().setAccountId(
    myAccountId
  );
  const queryOther = new AccountBalanceQuery().setAccountId(
    myAccountId3
  );
  const accountBalanceMine = await queryMine.execute(client2);
  const accountBalanceOther = await queryOther.execute(client2);
  console.log(
    `My account balance ${accountBalanceMine.hbars} HBar, other account balance ${accountBalanceOther.hbars}`
  );
}

UseAllowance();
