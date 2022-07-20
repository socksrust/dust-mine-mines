# Octopus Candy Machine.

### Resources

- https://hackmd.io/@levicook/HJcDneEWF
- https://github.com/exiled-apes/candy-machine-mint

## Steps

Change `--env devent` to `--env mainnet` to run on mainnet

### Upload Assets

```
ts-node ~/Projects/metaplex/js/packages/cli/src/candy-machine-cli.ts upload mint/build --keypair ~/.config/solana/devnet.json --env devnet
```

### Create Candy Machine

```
ts-node ~/Projects/metaplex/js/packages/cli/src/candy-machine-cli.ts create_candy_machine --keypair ~/.config/solana/devnet.json --env devnet
```

### Update release date

```
ts-node ~/Projects/metaplex/js/packages/cli/src/candy-machine-cli.ts update_candy_machine --keypair ~/.config/solana/devnet.json --env devnet --date "26 Sep 2021 00:12:00 GMT"
```

### Update mint price

Price in SOL.

```
ts-node ~/Projects/metaplex/js/packages/cli/src/candy-machine-cli.ts update_candy_machine --keypair ~/.config/solana/devnet.json --price 1 --env devnet
```

### Check Candy machine config

```
ts-node ~/Projects/metaplex/js/packages/cli/src/candy-machine-cli.ts show --cache-path .cache --keypair ~/.config/solana/devnet.json --env mainnet-beta
```
