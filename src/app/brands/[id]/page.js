"use client"
import React, {useState, useEffect} from 'react'
import MostLovedCard from "../../../components/mostLovedCard";

const page = ({params}) => {

    const id = params?.id;

    const [brand, setBrand] = useState([]);
    const [collections, setcollections] = useState([]);

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
     
       const phyres = await fetch(`${baseUri}/collections/all`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json'
         }
       });
     
       if (!res.ok || !phyres.ok) {
         throw new Error('Failed to fetch data');
       }
     
       const result = await res.json();
       const collections = await phyres.json();
     
         // Find the corresponding brand in result
         const matchedBrand = result.find(brand => brand.id === id);
         if (matchedBrand) {
           setBrand(matchedBrand);
         }

         // Filter collections by the brand id
  const matchedCollections = collections.filter(collection => collection.brand_id === id);

  setcollections(matchedCollections);
     
       console.log("brand", matchedBrand, matchedCollections);
     
     } catch (error) {
       console.error('Error fetching data:', error);
     }
        }
     
        brandmatch();
       }, [])

       
  return (
<>
    <img
              src={`${
                "https://nftstorage.link/ipfs"
              }/${brand?.cover_image?.slice(7)}`}
              alt={brand?.name}
              style={{
                // width: "250px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />

    <div style={{marginLeft:'40px', marginRight: '40px'}}>

<img
              src={`${
                "https://nftstorage.link/ipfs"
              }/${brand?.logo_image?.slice(7)}`}
              alt={brand?.name}
              style={{
                width: "250px",
                display: "block",
              }}
            />

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
        Background : {brand?.additional_info}
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

        <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap', justifyContent:'center' }}>
        {collections?.map((nft, index) => (
          <MostLovedCard key={index} nft={nft} />
        ))}
      </div>
    </div>

    </>
  )
}

export default page;