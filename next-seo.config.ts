const title = 'Solbets';
const description =
  'Solbets is a game center based on Solana and powered by OctopusArt and SolanaDBS NFT communities';

const SEO = {
  title,
  description,
  canonical: 'https://solbets.io/',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://solbets.io/',
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
