import constants from "./src/utils/constants";
const { infos } = constants;
const { name, website, image } = infos;


const title = name;
const description = `Variety of games for all the degens in Solana`;

const SEO = {
  title,
  description,
  canonical: website,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: website,
    title,
    description,
    images: [
      {
        url: image,
        alt: title,
        width: 1440,
        height: 926,
      },
    ],
  },
};

export default SEO;
