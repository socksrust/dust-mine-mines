const constants = {
  infos: {
    name: 'UGA Nation',
    website: 'https://twitter.com/UGA_NATI0N',
    image: 'https://i.imgur.com/AmgOt6C.png',
    publicKey: 'yJfwBxpMupdF2B4hDcsWv8wsj56mEcRyn1sY23yukRx',
    serverUrl: 'https://solaland-bet.herokuapp.com',
    project: 'uga'
  },
  colors: {
    primaryBackground: '#FFF',
    secondaryBackground: '#f0f0f0',
    objectBackground: '#EBBC00',
    objectText: '#FFF',
    buttonText: '#000',
    accentColor: '#EBBC00',
    disabledColor: 'grey',
  },
  objects: {
    logo: 'UGA Nation',
    logoUrl: 'https://i.imgur.com/AmgOt6C.png',
    coins: [
      {
        label: '$UGA',
        imgSrc: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7aENbEssDsZZ7T1HP7LLgoHJF8q4JDKfxArkmdLReUZc/logo.png',
        value: 'UGA',
        mintAddress: '282Weh31UZ1yw99dYV8JqxPLtFBNbN1UfZhjBiKNk9Zb',
        multiplier: 1000000,
        firstBetValue: 15,
        secondBetValue: 50,
        thirdBetValue: 100,
        maxBetValue: 500,
        toTokenAccountAddress: 'Ce9WoJM8mcNYNWnb2wkrD9EP4RCNSTQDSNx4uztht8ik',
      }
    ]
  }
}

export default constants;