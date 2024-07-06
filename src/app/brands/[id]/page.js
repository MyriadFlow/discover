"use client"
import React, {useState, useEffect} from 'react'
import MostLovedCard from "../../../components/mostLovedCard";
import HotNftCard from "../../../components/hotNftCard";
import Header1 from '../../../components/header1'
import Footer from '../../../components/footer'

const Brand = ({params}) => {

    const id = params?.id;

    const [brand, setBrand] = useState([]);
    const [collections, setcollections] = useState([]);
    const [nfts, setnfts] = useState([])
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const brandmatch = async() => {
          setloading(true);
         const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';
     
     try {
       const res = await fetch(`${baseUri}/brands/all`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json'
         }
       });
     
       const phyres = await fetch(`${baseUri}/collections/all`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json'
         }
       });

       const nfts = await fetch(`${baseUri}/phygitals/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
     
       if (!res.ok || !phyres.ok || !nfts.ok) {
         throw new Error('Failed to fetch data');
       }
     
       const result = await res.json();
       const collections = await phyres.json();
       const phynfts = await nfts.json();
     
         // Find the corresponding brand in result
         const matchedBrand = result.find(brand => brand.id === id);
         if (matchedBrand) {
           setBrand(matchedBrand);
         }

         // Filter collections by the brand id
  const matchedCollections = collections.filter(collection => collection.brand_id === id);

  // Extract the IDs of the matched collections
const matchedCollectionIds = matchedCollections.map(collection => collection.id);

// Filter NFTs by the matched collection IDs
const matchedNFTs = phynfts.filter(nft => matchedCollectionIds.includes(nft.collection_id));

  setcollections(matchedCollections);
  setnfts(matchedNFTs)
  setloading(false);
     
       console.log("phynfts", phynfts);
     
     } catch (error) {
       console.error('Error fetching data:', error);
       setloading(false);
     }
        }
     
        brandmatch();
       }, [])

       
  return (
<>
<div
				className=''
				style={{ zIndex: 10, position: 'fixed', left: 0, right: 0 }}
			>
				<Header1 />
			</div>
<div style={{ position: "relative", textAlign: "center", paddingTop:'90px' }}>
      <img
        src={`${
          "https://nftstorage.link/ipfs"
        }/${brand?.cover_image?.slice(7)}`}
        alt={brand?.name}
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <img
        src={`${
          "https://nftstorage.link/ipfs"
        }/${brand?.logo_image?.slice(7)}`}
        alt={brand?.name}
        style={{
          width: "250px",  // Adjust the width as needed
          position: "absolute",
          bottom: "20px",  // Adjust the offset from the bottom as needed
          left: "20px",  // Adjust the offset from the left as needed
        }}
      />
    </div>

    <div style={{marginLeft:'40px', marginRight: '40px', marginTop:'40px'}}>

        <div className="font-bold text-black text-6xl">
      {brand?.name}
      </div>
      <div
        className="text-2xl"
        style={{ justifyContent: "space-between" }}
      >
        <div className="mt-4">
        {brand?.description}
        </div>

        <div className="mt-4">
        Representative : {brand?.representative}
        </div> 

        <div className="mt-4">
        Contact Email : {brand?.contact_email}
        </div> 

        <div className="mt-4">
        Contact Phone : {brand?.contact_phone}
        </div>
        
        <div className="mt-4">
        Shipping Address : {brand?.shipping_address}
        </div> 

      </div>

      <div className="font-bold text-black text-4xl mt-10">Collections</div>

        <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap' }}>
        {collections?.map((nft, index) => (
          <MostLovedCard key={index} nft={nft} />
        ))}
      </div>

      <div className="font-bold text-black text-4xl mt-10">Phygitals</div>

      <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap' }}>
        {nfts?.map((nft, index) => (
          <HotNftCard key={index} nft={nft} />
        ))}
      </div>

    </div>

    <div className='pt-20'>
				<Footer />
			</div>


    {loading && (
  <div
    style={{
      // backgroundColor: "#222944E5",
      display: "flex",
      overflowY: "auto",
      overflowX: "hidden",
      position: "fixed",
      inset: 0,
      zIndex: 50,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      maxHeight: "100%",
    }}
    id="popupmodal"
  >
    <div style={{ position: "relative", padding: "1rem", width: "100%", maxHeight: "100%" }}>
      <div style={{ position: "relative", borderRadius: "0.5rem", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <img
            src="https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif"
            alt="Loading icon"
          />
        </div>
      </div>
    </div>
  </div>
)}

    </>
  )
}

export default Brand;