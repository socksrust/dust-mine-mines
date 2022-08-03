const constants = {
  infos: {
    name: 'Cactusino Mines',
    website: 'https://thebig5nft.com/',
    image: 'https://i.imgur.com/rH8QEZz.png',
    publicKey: 'kLd3C1Psm2PBZBQKTcNEg385U1jVsfsKd5Vg13iQxeZ',
    serverUrl: 'https://new-back-games.herokuapp.com',
    project: 'cactusino'
  },
  colors: {
    primaryBackground: '#FFF',
    secondaryBackground: '#f0f0f0',
    objectBackground: '#121E30',
    objectText: '#393824',
    buttonText: '#FFF',
    accentColor: '#121E30',
    disabledColor: 'grey',
  },
  objects: {
    logo: 'Cactusino Mines',
    logoUrl: 'https://i.imgur.com/rH8QEZz.png',
    coins: [
      {
        label: '$SOL',
        imgSrc: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
        value: 'SOL',
        mintAddress: '11111111111111111111111111111111',
        multiplier: Math.pow(10, 9),
        firstBetValue: .05,
        secondBetValue: .1,
        thirdBetValue: .25,
        maxBetValue: 1,
        toTokenAccountAddress: 'kLd3C1Psm2PBZBQKTcNEg385U1jVsfsKd5Vg13iQxeZ',
      },
    ]
  }
}

export default constants;
