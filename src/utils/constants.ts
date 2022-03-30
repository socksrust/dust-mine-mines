const constants = {
  infos: {
    name: 'SAINTxBLACKJACK',
    website: 'https://twitter.com/solalandhq',
    image: 'https://media.discordapp.net/attachments/950052662597021696/951555806615203890/Logo.png?width=1146&height=1146',
    publicKey: 'HR4E7PZATrihJ48ExoMQsFuDrXdNvKTBt1JAy4ZgddQu',
    serverUrl: 'https://solaland-bet.herokuapp.com',
    project: 'saint',
  },
  colors: {
    primaryBackground: '#000',
    secondaryBackground: 'rgba(255,255,255,0.1)',
    objectBackground: '#fff',
    objectText: '#fff',
    buttonText: '#000',
    accentColor: '#ff0000',
  },
  objects: {
    logo: 'SAINTxBLACKJACK',
    logoUrl: 'https://media.discordapp.net/attachments/950052662597021696/951555806615203890/Logo.png?width=1146&height=1146',
    coins: [
      {
        label: '$GEMS',
        imgSrc: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CS5tMuXYGR1cd2XnVQjoZ42Z1jWoW1Bu8ySdRBT99PDc/logo.png',
        value: 'GEMS',
        mintAddress: 'CS5tMuXYGR1cd2XnVQjoZ42Z1jWoW1Bu8ySdRBT99PDc',
        multiplier: 1000000000,
        firstBetValue: 10,
        secondBetValue: 50,
        thirdBetValue: 500,
        maxBetValue: 1000,
        toTokenAccountAddress: '866REczYqjMaMgxRQmisDK3HNzrQF3Z9hMD3Sq6wKMFE',
      }
    ]
  }
}

export default constants;