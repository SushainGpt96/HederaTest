const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } = require("@hashgraph/sdk");
    const myAccountId = '0.0.13726204';
    const myPrivateKey = PrivateKey.fromString(
      '302e020100300506032b657004220420577a099b3a7a62acf1457a9bbd3d6613fcbda05fe0e8572870e51f66e91f576b'
    );

    // If we weren't able to grab it, we should throw a new error
    if (!myAccountId || !myPrivateKey) {
        throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
    }

//Create your Hedera Testnet client
const client = Client.forTestnet();

//Set your account as the client's operator
client.setOperator(myAccountId, myPrivateKey);

//Set the default maximum transaction fee (in Hbar)
client.setDefaultMaxTransactionFee(new Hbar(100));

//Set the maximum payment for queries (in Hbar)
client.setMaxQueryPayment(new Hbar(50));

async function createbytecode() {
//Get the contract bytecode
const bytecode = "608060405234801561001057600080fd5b5061089d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80633a04033c146100465780634753b51b146100d75780637f6314d01461013b575b600080fd5b6100d56004803603608081101561005c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803560070b906020019092919050505061019f565b005b610139600480360360408110156100ed57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061022f565b005b61019d6004803603604081101561015157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506102bb565b005b60006101ad85858585610347565b9050601660030b8114610228576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f5472616e73666572204661696c6564000000000000000000000000000000000081525060200191505060405180910390fd5b5050505050565b600061023b8383610519565b9050601660030b81146102b6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f446973736f6369617465204661696c656400000000000000000000000000000081525060200191505060405180910390fd5b505050565b60006102c783836106c0565b9050601660030b8114610342576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f4173736f6369617465204661696c65640000000000000000000000000000000081525060200191505060405180910390fd5b505050565b600080606061016773ffffffffffffffffffffffffffffffffffffffff1663eca3691760e01b88888888604051602401808573ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018260070b8152602001945050505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040518082805190602001908083835b6020831061046b5780518252602082019150602081019050602083039250610448565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d80600081146104cd576040519150601f19603f3d011682016040523d82523d6000602084013e6104d2565b606091505b5091509150816104e357601561050a565b8080602001905160208110156104f857600080fd5b81019080805190602001909291905050505b60030b92505050949350505050565b600080606061016773ffffffffffffffffffffffffffffffffffffffff1663099794e860e01b8686604051602401808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200192505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040518082805190602001908083835b6020831061061457805182526020820191506020810190506020830392506105f1565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610676576040519150601f19603f3d011682016040523d82523d6000602084013e61067b565b606091505b50915091508161068c5760156106b3565b8080602001905160208110156106a157600080fd5b81019080805190602001909291905050505b60030b9250505092915050565b600080606061016773ffffffffffffffffffffffffffffffffffffffff166349146bde60e01b8686604051602401808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200192505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040518082805190602001908083835b602083106107bb5780518252602082019150602081019050602083039250610798565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d806000811461081d576040519150601f19603f3d011682016040523d82523d6000602084013e610822565b606091505b50915091508161083357601561085a565b80806020019051602081101561084857600080fd5b81019080805190602001909291905050505b60030b925050509291505056fea264697066735822122068ba1095e27dfaf338e8ee9d0914f328fe6a23627ce5b8245b5fd09275ba76d964736f6c634300060c0033";

//Create a file on Hedera and store the hex-encoded bytecode
const fileCreateTx = new FileCreateTransaction()
    .setContents(bytecode);

//Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
const submitTx = await fileCreateTx.execute(client);

//Get the receipt of the file create transaction
const fileReceipt = await submitTx.getReceipt(client);

//Get the file ID from the receipt
const bytecodeFileId = fileReceipt.fileId;

//Log the file ID
console.log("The smart contract bytecode file ID is " +bytecodeFileId)
}

createbytecode();

async function deploycontract() {
//Deploy the contract instance
const contractTx = await new ContractCreateTransaction()
    //The bytecode file ID
    .setBytecodeFileId(bytecodeFileId)
    //The max gas to reserve
    .setGas(2000000);

//Submit the transaction to the Hedera test network
const contractResponse = await contractTx.execute(client);

//Get the receipt of the file create transaction
const contractReceipt = await contractResponse.getReceipt(client);

//Get the smart contract ID
const newContractId = contractReceipt.contractId;

//Log the smart contract ID
console.log("The smart contract ID is " + newContractId);
    }
    
deploycontract();

    
async function tokenAssociate() {
    //Get the token associate transaction record
const childRecords = new TransactionRecordQuery()
//Set children equal to true for child records
.setIncludeChildren(true)
//The parent transaction ID
.setTransactionId(submitAssociateTx.transactionId)
.setQueryPayment(new Hbar(10))
.execute(client);


console.log("The transaction record for the associate transaction" +JSON.stringify((await childRecords).children));

//The balance of the account
const accountBalance = new AccountBalanceQuery()
.setAccountId(accountIdTest)
.execute(client);

console.log("The " + tokenId + " should now be associated to my account: " + (await accountBalance).tokens.toString());
        }
        
    tokenAssociate();

async function tokentransfer() {
//Transfer the new token to the account
//Contract function params need to be in the order of the paramters provided in the tokenTransfer contract function
const tokenTransfer = new ContractExecuteTransaction()
    .setContractId(newContractId)
    .setGas(2000000)
    .setFunction("tokenTransfer", new ContractFunctionParameters()
         //The ID of the token
         .addAddress(tokenId.toSolidityAddress())
         //The account to transfer the tokens from
         .addAddress(treasuryAccountId.toSolidityAddress())
         //The account to transfer the tokens to
         .addAddress(accountIdTest.toSolidityAddress())
          //The number of tokens to transfer
         .addInt64(100));

//Sign the token transfer transaction with the treasury account to authorize the transfer and submit
const signTokenTransfer = await tokenTransfer.freezeWith(client).sign(treasuryKey);

//Submit transfer transaction
const submitTransfer = await signTokenTransfer.execute(client);

//Get transaction status
const transferTxStatus = await (await submitTransfer.getReceipt(client)).status;

//Get the transaction status
console.log("The transfer transaction status " +transferTxStatus.toString());

//Verify the account received the 100 tokens
const newAccountBalance = new AccountBalanceQuery()
       .setAccountId(accountIdTest)
       .execute(client);
       
console.log("My new account balance is " +(await newAccountBalance).tokens.toString());
    }
    
tokentransfer();
