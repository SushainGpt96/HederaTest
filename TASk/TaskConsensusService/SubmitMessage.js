const {
  TopicCreateTransaction,
  Client,
  Wallet,
  TopicMessageQuery,
  TopicMessageSubmitTransaction,
  TopicInfoQuery,
  PrivateKey,
} = require('@hashgraph/sdk');
require('dotenv').config({ path: '../.env' });

// const myAccountId = process.env.MY_ACCOUNT_ID;
// const myPrivateKey = PrivateKey.fromString(
//   process.env.MY_PRIVATE_KEY
// );

// const myAccountId2 = process.env.ACCOUNT_ID_2;
// const myPrivateKey2 = PrivateKey.fromString(
//   process.env.PRIVATE_KEY_2
// );

const myAccountId = '0.0.13726204';
const myPrivateKey = PrivateKey.fromString(
  '302e020100300506032b657004220420577a099b3a7a62acf1457a9bbd3d6613fcbda05fe0e8572870e51f66e91f576b'
);

const myAccountId2 = '0.0.13726273';
const myPrivateKey2 = PrivateKey.fromString(
  '302e020100300506032b65700422042047564ded866b5f98c8782c45d38fb210aa1dc92a2fe9c9944f0f86ffc015c35c'
);

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

const walletUser = new Wallet(myAccountId, myPrivateKey);
const walletUser2 = new Wallet(myAccountId2, myPrivateKey2);

async function submitMessage(topicId) {
  let sendResponse = await new TopicMessageSubmitTransaction({
    topicId: topicId,
    message: new Date().toISOString(),
  }).execute(client);

  const getReceipt = await sendResponse.getReceipt(client);
  const transactionStatus = getReceipt.status;
  console.log('The message transaction status: ' + transactionStatus);

  process.exit();
}

submitMessage('0.0.13726697');
