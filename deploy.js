const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { abi, evm } = require('./compile');

const mySecret = process.env.MNEMONIC;
const rinkebyApi = process.env.RINKEBY_API;

const provider = new HDWalletProvider(
  mySecret,
  rinkebyApi
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
      const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from contract', accounts[0]);

    const result = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object, arguments: ['Hello Inbox Contract'] })
      .send({ from: accounts[0], gas: '1000000' });

    console.log('Contract deployed to', result.options.address);
  } catch (error) {
    console.error(error);
  }
  provider.engine.stop();
};

deploy();
