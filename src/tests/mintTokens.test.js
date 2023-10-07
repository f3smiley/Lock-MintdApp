const assert = require('assert');
const Web3 = require('web3');
const mintTokens = require('../js/mintTokens.js');
const SyntheticToken = require('../contracts/SyntheticToken.sol');

describe('mintTokens', function() {
    let web3;
    let accounts;
    let syntheticToken;

    before(async function() {
        web3 = new Web3('http://localhost:8545');
        accounts = await web3.eth.getAccounts();
        syntheticToken = new web3.eth.Contract(SyntheticToken.abi, SyntheticToken.address);
    });

    it('should mint tokens when lock event is emitted', async function() {
        const initialBalance = await syntheticToken.methods.balanceOf(accounts[0]).call();
        await mintTokens(accounts[0], 1);
        const finalBalance = await syntheticToken.methods.balanceOf(accounts[0]).call();
        assert.equal(finalBalance, initialBalance + 1, 'Token balance did not increase correctly');
    });

    it('should update total supply when tokens are minted', async function() {
        const initialSupply = await syntheticToken.methods.totalSupply().call();
        await mintTokens(accounts[0], 1);
        const finalSupply = await syntheticToken.methods.totalSupply().call();
        assert.equal(finalSupply, initialSupply + 1, 'Total supply did not increase correctly');
    });

    it('should emit TokensMinted event when tokens are minted', function(done) {
        syntheticToken.events.TokensMinted({
            filter: {from: accounts[0]},
            fromBlock: 'latest'
        })
        .on('data', function(event) {
            assert.equal(event.returnValues.amount, 1, 'TokensMinted event amount incorrect');
            done();
        });

        mintTokens(accounts[0], 1);
    });
});