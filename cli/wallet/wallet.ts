import { Mnemonic, ethers } from "ethers"

function randomMonemic() {
    const crypto = require('crypto');
    const bip39 = require('bip39');

    // 生成随机的 16 字节（128 位）熵
    const entropyBytes = crypto.randomBytes(16);

    // 生成以太坊助记词
    const mnemonic = bip39.entropyToMnemonic(entropyBytes.toString('hex'));

    console.log('随机生成的以太坊助记词:', mnemonic);
}

async function listPrivatekeys(mnemonic: string, count: number) {
    // 循环生成私钥
    for (let index = 0; index < count; index++) {
        // 构建派生路径
        const path = `m/44'/60'/0'/0/${index}`;

        // 通过助记词和派生路径生成 HD 钱包
        const wallet = ethers.HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic), path)

        // 获取私钥
        const privateKey = wallet.privateKey;
        const address = wallet.address;
        console.log(`Private Key ${index + 1}: ${privateKey}, Address: ${address}`);
    }
}

export {
    randomMonemic as randomMnemonic,
    listPrivatekeys
}