const constants = {
  infos: {
    name: 'The Big Five',
    website: 'https://thebig5nft.com/',
    image: 'https://i.imgur.com/BbvHBVp.png',
    publicKey: 'AJSnsqD2fKwcpiPwto2Qcw2VmLsK3cvkFTcqwJxwuBUD',
    // serverUrl: 'https://solaland-bet.herokuapp.com',
    serverUrl: 'https://new-back-games.herokuapp.com',
    // project: 'bigfive'
    project: 'tester'
  },
  colors: {
    primaryBackground: '#FFF',
    secondaryBackground: '#f0f0f0',
    objectBackground: '#121E30',
    objectText: '#FFF',
    buttonText: '#FFF',
    accentColor: '#121E30',
    disabledColor: 'grey',
  },
  objects: {
    logo: 'The Big Five',
    logoUrl: 'https://i.imgur.com/BbvHBVp.png',
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
        toTokenAccountAddress: 'EMcUqmGaAw14FZTZ2tdcj8NG2GeUoCGfYhyUcKxJYofK',
      },
    ]
  }
}

export default constants;
