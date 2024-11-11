export async function generateMetadata({ params }) {
  const baseUri = process.env.NEXT_PUBLIC_URI || "https://app.myriadflow.com";
  const res = await fetch(
    `${baseUri}/brands/all/554b4903-9a06-4031-98f4-48276c427f78`
  );
  const brands = await res.json();

  const brandName = params?.id
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const brand = brands.find((b) => b.name === brandName);

  if (!brand) {
    return {
      title: "Brand Not Found",
    };
  }

  const imageUrl = `https://nftstorage.link/ipfs/${brand.cover_image?.slice(
    7
  )}`;

  return {
    title: brand.name,
    description: brand.description,
    openGraph: {
      title: brand.name,
      description: brand.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: brand.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brand.name,
      description: brand.description,
      images: [imageUrl],
    },
  };
}

export default function BrandLayout({ children }) {
  return children;
}
