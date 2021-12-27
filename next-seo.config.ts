const title = 'CoinFlip';
const description =
  'CoinFlip is a CoinFlip game based on Solana and powered by OctopusArt and SolanaDBS NFT communities';

const SEO = {
  title,
  description,
  canonical: 'https://coin.solbets.io/',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://coin.solbets.io/',
    title,
    description,
    images: [
      {
        url: 'https://peach-oct.netlify.app/images/bg.png',
        alt: title,
        width: 1440,
        height: 926,
      },
    ],
  },
};

export default SEO;
