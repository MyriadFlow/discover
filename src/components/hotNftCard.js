"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const HotNftCard = ({ nft }) => {

  const [logo , setLogos] = useState("");
  const [priceUSD, setPriceUSD] = useState("")

  useEffect(() => {
   const brandmatch = async() => {
    const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

try {
  const res = await fetch(`${baseUri}/brands/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const phyres = await fetch(`${baseUri}/phygitals/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok || !phyres.ok) {
    throw new Error('Failed to fetch data');
  }

  const result = await res.json();
  const phyresult = await phyres.json();

  // Find the phyresult item matching the targetId
  const matchingPhy = phyresult.find(phy => phy.id === nft?.id);

  if (matchingPhy) {
    // Find the corresponding brand in result
    const matchedBrand = result.find(brand => brand.name === matchingPhy.brand_name);
    if (matchedBrand) {
      setLogos(matchedBrand.logo_image);
    }
  }

  console.log("logo", logo, result, phyresult);

} catch (error) {
  console.error('Error fetching data:', error);
}
   }

   brandmatch();
  }, [])



  useEffect(() => {
    const pricetoUSD = async() => {
       // Fetch the current ETH to USD conversion rate
  const conversionRateRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    
  if (!conversionRateRes.ok) {
    throw new Error('Failed to fetch ETH to USD conversion rate');
  }
  
  const conversionRateResult = await conversionRateRes.json();
  const ethToUsdRate = conversionRateResult.ethereum.usd;
  
  console.log("Current ETH to USD rate:", ethToUsdRate);
 
  // Convert the lowest price from ETH to USD
  const lowestPriceInUSD = nft?.price * ethToUsdRate;
  console.log("The lowest price in USD is:", lowestPriceInUSD.toFixed(2));
  setPriceUSD(lowestPriceInUSD.toFixed(2));
    }
  
   pricetoUSD();
  }, [])
  
  


  return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <Link href={`/nfts/${nft.id}`}>
          <div
            style={{
              width: "330px",
              borderRadius: "30px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={`https://nftstorage.link/ipfs/${nft?.image.slice(7)}`}
                className="rounded"
                style={{ padding: "20px", borderRadius: '30px' }}
                alt="Gold Headphones"
              />
              <img
                src={`https://nftstorage.link/ipfs/${logo?.slice(7)}`}
                alt="New Icon"
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  width: "50px",
                  height: "50px",
                  borderRadius: '50px'
                }}
              />
            </div>
            <div
              className="flex justify-between"
              style={{ paddingLeft: "20px", paddingRight: "20px", justifyContent: 'space-between' }}
            >
              <div className="font-bold text-lg">{nft?.name}</div>
              <div>...</div>
            </div>
            <div
              className="flex justify-between mt-4"
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingBottom: "20px",
                justifyContent: 'space-between'
              }}
            >
              {nft?.product_url ?
                (
                  <div
                    className="text-lg"
                    style={{
                      border: "1px solid black",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "5px",
                      gap: '4px',
                      paddingLeft: '25px',
                      paddingRight: '25px',
                      marginBottom: '25px'
                    }}
                  >
                    <div>Buy</div>
                    <img style={{ width: '25px' }} src="/shopify.png" alt="Buy Icon"/>
                  </div>
                ) :
                (
                  <div>
                    <div className="text-2xl">{nft?.price} ETH</div>
                    <div>{priceUSD} USD</div>
                  </div>
                )}
              {nft?.product_url ?
                (
                  <div
                    className="px-10 text-lg"
                    style={{
                      backgroundColor: "#DF1FDD36",
                      border: "1px solid black",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "5px",
                    }}
                  >
                    Claim
                  </div>
                ) :
                (
                  <div
                    className="px-10 text-lg"
                    style={{
                      backgroundColor: "#DF1FDD36",
                      border: "1px solid black",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "5px",
                    }}
                  >
                    Buy
                  </div>
                )}
            </div>
          </div>
        </Link>
        <Link href={`https://webxr.myriadflow.com/${nft?.id}`} target="_blank"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "5px 20px",
            borderRadius: "10px",
            border: '1px solid black',
            background: 'white',
            zIndex: 1 // Ensure it's on top of the card
          }}
        >
          Web XR
        </Link>
      </div>
    );
}

export default HotNftCard;
