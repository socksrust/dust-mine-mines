const constants = {
  infos: {
    name: 'The Big Five',
    website: 'https://thebig5nft.com/',
    image: 'https://i.imgur.com/5D2tDuk.png',
    publicKey: 'AJSnsqD2fKwcpiPwto2Qcw2VmLsK3cvkFTcqwJxwuBUD',
    // serverUrl: 'https://solaland-bet.herokuapp.com',
    serverUrl: 'https://new-back-games.herokuapp.com',
    project: 'bigfive'
    // project: 'tester'
  },
  colors: {
    primaryBackground: '#000',
    secondaryBackground: '#f0f0f0',
    objectBackground: '#AEC8AE',
    objectText: '#000',
    buttonText: '#000',
    accentColor: '#AEC8AE',
    disabledColor: 'grey',
  },
  objects: {
    logo: 'The Big Five',
    logoUrl: 'https://i.imgur.com/5D2tDuk.png',
    coins: [
      {
        label: '$TBF',
        imgSrc: 'https://raw.githubusercontent.com/thebigfivenft/asset/main/the-big-fiv.png',
        value: 'TBF',
        mintAddress: '2ZamLCGLPSpP2MRbeM2wXRWzTEDhr669cFycVWgzBixi',
        multiplier: Math.pow(10, 6),
        firstBetValue: 2,
        secondBetValue: 4,
        thirdBetValue: 10,
        maxBetValue: 10,
        toTokenAccountAddress: 'BgTQeR6JQjUW8fDYmNKa1xS9RhwULJiQFQd2yDJZnjtN',
      }
    ]
  }
}

export default constants;
