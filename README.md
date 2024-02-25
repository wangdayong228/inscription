# inscription

Options
```
Usage: inscription [options]

Options:
  -k, --privateKey <string>  Private key
  -d, --data <string>        Data
  -c, --count <number>       Count (default: "1000")
  -b, --batch                Send on batch (default send one by one)
  -v, --verbose              Verbose
  -h, --help                 display help for command
```

Run
```
ts-node ./inscription -k YOUR_PRIVATEKEY -c MINT_COUNT -b -v
```

# wallet

```
Usage: wallet [options] [command]

Options:
  -h, --help              display help for command

Commands:
  randomMonemic
  listPrivates [options]
  help [command]          display help for command
```

Gen random mnemonic
```
ts-node ./wallet randomMonemic
```