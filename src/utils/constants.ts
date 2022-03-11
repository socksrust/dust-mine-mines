
const constants = {
  infos: {
    name: 'SAINTxDAO',
    website: 'https://twitter.com/SAINTxDAO',
    image: 'https://media.discordapp.net/attachments/950052662597021696/951555806615203890/Logo.png?width=1038&height=1038',
    publicKey: 'HR4E7PZATrihJ48ExoMQsFuDrXdNvKTBt1JAy4ZgddQu',
    serverUrl: 'https://saintxdao-flip.herokuapp.com',
  },
  colors: {
    primaryBackground: '#090B0B',
    secondaryBackground: '#141717',
    objectBackground: '#fff',
    objectText: '#fff',
    buttonText: '#070b17',
    accentColor: '#FF0000',
  },
  objects: {
    logo: 'SAINTxDAO',
    logoUrl: 'https://media.discordapp.net/attachments/950052662597021696/951555806615203890/Logo.png?width=1038&height=1038',
    coins: [
      {
        label: '$GEMS',
        imgSrc: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CS5tMuXYGR1cd2XnVQjoZ42Z1jWoW1Bu8ySdRBT99PDc/logo.png', 
        value: 'GEMS',
        mintAddress: 'CS5tMuXYGR1cd2XnVQjoZ42Z1jWoW1Bu8ySdRBT99PDc',
        multiplier: 1000000000,
        firstBetValue: 5,
        secondBetValue: 100,
        thirdBetValue: 1000,
        maxBetValue: 10000,
        toTokenAccountAddress: '866REczYqjMaMgxRQmisDK3HNzrQF3Z9hMD3Sq6wKMFE',
      }
    ]
  }
}

export default constants;