import { it, describe } from "mocha";
import { expect, assert } from "chai";
import { ethers } from "ethers"
// import config from "../config"

const provider = new ethers.JsonRpcProvider("https://rpc.zkfair.io")

describe("ethers provider should work", async () => {
    it("should get transaction count", async () => {
        const nonce = await provider.getTransactionCount("0x37eC6bE72E7Ce9A0661EFdB9b1FBBA3b64B81c9D")
        expect(Number(nonce)).to.be.gte(0)
    })
})