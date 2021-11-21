const title = 'BIP Games';
const description =
  'BIP Games is a game center based on Solana and powered by OctopusArt and SolanaDBS NFT communities';

const SEO = {
  title,
  description,
  canonical: 'https://bip-games.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://bip-games.vercel.app/',
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
