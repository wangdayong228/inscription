import { program } from 'commander';

program
    .requiredOption('-k, --privateKey <string>', 'Private key')
    .requiredOption('-d, --data <string>', 'Data')
    .option('-c, --count <number>', 'Count', "1000")
    .option('-v, --verbose', 'Verbose');

program.parse(process.argv);

const options = program.opts();

console.log("parsed options:", options)

export default {
    // RPC结点（兼容 evm 链都行）打哪条链就用哪条链的节点地址
    // eth =>  https://mainnet.infura.io/v3
    // arb => https://arb1.arbitrum.io/rpc
    // polygon => https://polygon-rpc.com
    // op => https://mainnet.optimism.io
    // linea => https://mainnet.infura.io/v3
    // scroll => https://rpc.scroll.io
    // zks => https://mainnet.era.zksync.io
    // zks => https://mainnet.era.zksync.io
    // conflux => https://evm.confluxrpc.org
    // avax => https://avax-pokt.nodies.app/ext/bc/C/rpc
    // okc => https://1rpc.io/oktc
    // zkfair: "https://rpc.zkfair.io"
    // URL: "https://avax-pokt.nodies.app/ext/bc/C/rpc",
    URL:"https://avalanche.drpc.org",
    PrivateKey: options.privateKey,
    Count: options.count,
    Data: options.data,
    Verbose: options.verbose,
    MaxGasprice: 500000e9
}