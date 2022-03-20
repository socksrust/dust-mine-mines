
const constants = {
  infos: {
    name: 'Solana Puppy Pound Casino',
    website: 'https://twitter.com/solpuppypound',
    image: 'https://media.discordapp.net/attachments/953774408470761544/953787077651234906/SOLANA-PUPPY-POUND.png?width=1504&height=1112',
    publicKey: 'GneuCzhfTiDCVEAwLAcFGEkWhyfjM6QKEFhhVo7DBLkU',
    serverUrl: 'https://spp-casino.herokuapp.com',
  },
  colors: {
    primaryBackground: '#090d29',
    secondaryBackground: '#18215f',
    objectBackground: '#fff',
    objectText: '#fff',
    buttonText: '#070b17',
    accentColor: '#9949E4',
  },
  objects: {
    logo: 'Solana Puppy Pound Casino',
    logoUrl: 'https://media.discordapp.net/attachments/953774408470761544/953787076933984367/SOLANA-PUPPY-POUND.gif',
    coins: [
      {
        label: '$TREATS',
        imgSrc: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/14r8dWfzmUUBpw59w5swNRb5F1YWqmUnSPgD6djUs1Jj/logo.png',
        value: 'TREATS',
        mintAddress: '14r8dWfzmUUBpw59w5swNRb5F1YWqmUnSPgD6djUs1Jj',
        multiplier: 1000000000,
        firstBetValue: 100,
        secondBetValue: 200,
        thirdBetValue: 300,
        maxBetValue: 1000,
        toTokenAccountAddress: 'BFzabon2xfiaBkXmJBdEdUkfKsppcCxRoB6uXEgqRcLj',
      }
    ]
  }
}

export default constants;