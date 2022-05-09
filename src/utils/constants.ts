const constants = {
  infos: {
    name: 'Chill Elephants',
    website: 'https://thechillelephantsnft.site/',
    image: 'https://i.imgur.com/Ds3UwaP.png',
    publicKey: 'G5gSQN1moTKtmQq89kJ2Vw2VcV38jLt7aByHjYSit8jw',
    // serverUrl: 'https://solaland-bet.herokuapp.com',
    serverUrl: 'https://new-back-games.herokuapp.com',
    project: 'chillelephant'
  },
  colors: {
    primaryBackground: '#FFF',
    secondaryBackground: '#f0f0f0',
    objectBackground: '#40e0d0',
    objectText: '#FFF',
    buttonText: '#000',
    accentColor: '#40e0d0',
    disabledColor: 'grey',
  },
  objects: {
    logo: 'Chill Elephants',
    logoUrl: 'https://i.imgur.com/Ds3UwaP.png',
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
        toTokenAccountAddress: 'G5gSQN1moTKtmQq89kJ2Vw2VcV38jLt7aByHjYSit8jw',
      },
      {
        label: '$HERD',
        imgSrc: 'https://raw.githubusercontent.com/TheChillElephantsClub/assets/main/HERD_COIN_LOGO.png',
        value: 'HERD',
        mintAddress: 'B4pZJFQm9VDdscJzoR4TTuj8YwexY4kYMfmRCxbZwbcV',
        multiplier: 1000000000,
        firstBetValue: 150,
        secondBetValue: 300,
        thirdBetValue: 450,
        maxBetValue: 500,
        toTokenAccountAddress: '47wmwc4evqKq7gucJZFmGnz7znsjoVZxsj3QUuPbvVrt',
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