import { program } from 'commander';
import { listPrivatekeys, randomMnemonic } from './wallet';

program
    .command("randomMnemonic")
    .action(randomMnemonic)

program
    .command("listPrivates")
    .requiredOption('-m, --mnemonic <string>', 'Monemic')
    .option('-c, --count <number>', 'Count', "10")
    .option('-v, --verbose', 'Verbose')
    .action(async (options: any) => {
        console.log("parsed options:", options)
        await listPrivatekeys(options.mnemonic, options.count);
    })

program.parse(process.argv);