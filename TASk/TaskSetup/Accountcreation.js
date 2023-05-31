const {
  Client,
  AccountBalanceQuery,
  TransferTransaction,
  Hbar,
  PrivateKey,
  AccountCreateTransaction,
  AccountAllowanceApproveTransaction,
} = require("@hashgraph/sdk");
require("dotenv").config({ path: "../.env" });

const myAccountId = "0.0.13726204";
const myPrivateKey = PrivateKey.fromString(
  "302e020100300506032b657004220420577a099b3a7a62acf1457a9bbd3d6613fcbda05fe0e8572870e51f66e91f576b"
);

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

async function createNewAccount() {
  const newAccountPrivateKey = PrivateKey.generateED25519();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;
  const newAccount = await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(new Hbar(0))
    .execute(client);
  const getReceipt = await newAccount.getReceipt(client);
  const newAccountId = getReceipt.accountId;
  console.log(newAccountPrivateKey.toString());
  console.log("The new account ID is: " + newAccountId);
  process.exit();
}


createNewAccount();