export async function generateMetadata({ params }) {
  const baseUri = process.env.NEXT_PUBLIC_URI || "https://app.myriadflow.com";

  // Fetch phygitals
  const nftsRes = await fetch(
    `${baseUri}/phygitals/all/554b4903-9a06-4031-98f4-48276c427f78`
  );
  const phygitals = await nftsRes.json();

  // Format the NFT name from params
  const nftName = params?.id
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  // Find the matching NFT
  const nft = phygitals.find((p) => p.name === nftName);

  if (!nft) {
    return {
      title: "NFT Not Found",
    };
  }

  // Get detailed NFT info
  const nftDetailRes = await fetch(`${baseUri}/phygitals/${nft.id}`);
  const nftDetail = await nftDetailRes.json();

  const imageUrl = `https://nftstorage.link/ipfs/${nftDetail.image?.slice(7)}`;
  const title = `${nftDetail.name} | MyriadFlow Discover`;
  const description =
    nftDetail.description ||
    "Own the future of collecting! MyriadFlow Discover lets you buy, sell, and showcase unique phygital NFTs. Explore immersive VR experiences that bring your digital collectibles to life.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: nftDetail.name,
        },
      ],
      type: "website",
      url: `https://discover.myriadflow.com/nfts/${params.id}`,
    },
    twitter: {
      card: "summary_large_image",
      site: "@MyriadFlow",
      title,
      description,
      images: [imageUrl],
    },
    other: {
      "og:site_name": "MyriadFlow Discover",
      "og:type": "website",
      "twitter:domain": "discover.myriadflow.com",
      "twitter:url": `https://discover.myriadflow.com/nfts/${params.id}`,
    },
  };
}

export default function NFTLayout({ children }) {
  return children;
}
