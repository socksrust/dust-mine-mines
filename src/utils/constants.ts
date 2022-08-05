const constants = {
  infos: {
    name: 'dustmine Mines',
    website: '',
    image: 'https://i.imgur.com/Tnow86G.png',
    publicKey: '9DxfS7rgKExG5N28JnWXn4YBfG4KJa3HKnYeuMtbySjG',
    serverUrl: 'https://new-back-games.herokuapp.com',
    project: 'dustmine'
  },
  colors: {
    primaryBackground: '#FFF',
    secondaryBackground: '#f0f0f0',
    objectBackground: '#111922',
    objectText: '#393824',
    buttonText: '#FFF',
    accentColor: '#111922',
    disabledColor: 'grey',
  },
  objects: {
    logo: 'dustmine Mines',
    logoUrl: 'https://i.imgur.com/Tnow86G.png',
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
        toTokenAccountAddress: '9DxfS7rgKExG5N28JnWXn4YBfG4KJa3HKnYeuMtbySjG',
      },
    ]
  }
}

export default constants;
