const constants = {
  infos: {
    name: 'SolRobos',
    website: 'https://magiceden.io/marketplace/srobos',
    image: 'https://dl.airtable.com/.attachmentThumbnails/56caa3ea3840825f0508c9fc8aedff91/04fab6f2',
    publicKey: 'AJSnsqD2fKwcpiPwto2Qcw2VmLsK3cvkFTcqwJxwuBUD',
    // serverUrl: 'https://solaland-bet.herokuapp.com',
    serverUrl: 'https://new-back-games.herokuapp.com',
    project: 'solrobos'
  },
  colors: {
    primaryBackground: '#FFF',
    secondaryBackground: '#f0f0f0',
    objectBackground: '#1F3F39',
    objectText: '#FFF',
    buttonText: '#000',
    accentColor: '#1F3F39',
    disabledColor: 'grey',
  },
  objects: {
    logo: 'SolRobos',
    logoUrl: 'https://dl.airtable.com/.attachmentThumbnails/56caa3ea3840825f0508c9fc8aedff91/04fab6f2',
    coins: [
      {
        label: '$SOL',
        imgSrc: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
        value: 'SOL',
        mintAddress: '11111111111111111111111111111111',
        multiplier: Math.pow(10, 9),
        firstBetValue: .1,
        secondBetValue: .25,
        thirdBetValue: .5,
        maxBetValue: .5,
        toTokenAccountAddress: 'AJSnsqD2fKwcpiPwto2Qcw2VmLsK3cvkFTcqwJxwuBUD',
      }
    ]
  }
}

export default constants;

/*

coinflip
blackjack
roullete
mine

*/