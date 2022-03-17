
const constants = {
  infos: {
    name: 'Solana Puppy Pound',
    website: 'https://twitter.com/solpuppypound',
    image: 'https://media.discordapp.net/attachments/953409170827272225/953780138875699250/OEZ1Sf6Z_400x400.png',
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
    logo: 'Solana Puppy Pound',
    logoUrl: 'https://media.discordapp.net/attachments/953774408470761544/953787076933984367/SOLANA-PUPPY-POUND.gif',
    coins: [
      {
        label: '$TREATS',
        imgSrc: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/14r8dWfzmUUBpw59w5swNRb5F1YWqmUnSPgD6djUs1Jj/logo.png',
        value: 'TREATS',
        mintAddress: '14r8dWfzmUUBpw59w5swNRb5F1YWqmUnSPgD6djUs1Jj',
        multiplier: 1000000000,
        firstBetValue: 15,
        secondBetValue: 50,
        thirdBetValue: 100,
        maxBetValue: 1000,
        toTokenAccountAddress: 'BFzabon2xfiaBkXmJBdEdUkfKsppcCxRoB6uXEgqRcLj',
      }
    ]
  }
}

export default constants;