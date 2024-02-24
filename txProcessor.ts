import { ethers } from "ethers"
import config from "./config"

const provider = new ethers.JsonRpcProvider(config.URL)
const signer = new ethers.Wallet(config.PrivateKey, provider)

console.log("verbose option: ", config.Verbose)

if (config.Verbose) {
    console.log("show verbose info")
    provider.on('debug', (info) => {
        console.log(JSON.stringify(info));
    });
}

async function sendOneRound(count: number): Promise<number> {

    // get nonce,price
    const nonce = await provider.getTransactionCount(signer.address)
    const feeData = await provider.getFeeData()
    if (feeData.gasPrice == null) {
        return 0
    }

    const request = {
        from: signer.address,
        to: signer.address,
        data: config.Data
    }
    const gasPrice = feeData.gasPrice * 110n / 100n
    const gasLimit = await provider.estimateGas(request)

    let lastHash = ""
    let validCount = 0

    let nextNonce = nonce
    for (let i = 0; i < count; i++) {
        console.log(`start send ${i} nonce ${nextNonce}`)
        try {
            // const tx = await signer.populateTransaction(
            //     {
            //         to: signer.address,
            //         data: config.Data,
            //         nonce: nextNonce,
            //         gasLimit,
            //         gasPrice,
            //     }
            // )
            const resp = await signer.sendTransaction({
                to: signer.address,
                data: config.Data,
                nonce: nextNonce,
                gasLimit,
                gasPrice,
            })
            console.log(`send ${i} nonce ${nextNonce} gasprice ${gasPrice} hash ${resp.hash}`)

            nextNonce = nextNonce + 1
            lastHash = resp.hash
            validCount++
        } catch (err) {
            console.warn(`send nonce ${nextNonce} error ${err}`)
        }
    }

    if (validCount == 0 || lastHash == "") {
        return 0
    }

    // wait receipt
    for (let i = 0; i < 20; i++) {
        const receipt = await provider.getTransactionReceipt(lastHash)
        if (receipt != null) {
            return validCount
        }
        await sleep(1000)
    }

    return 0
}

async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {
    sendOneRound
}

