'use client'
import React, { useState, useEffect } from 'react'
import HotNftCard from './hotNftCard'
import { createClient } from '@supabase/supabase-js'
import {useAccount, useChainId } from 'wagmi';
import Moralis from 'moralis';

const HotNFTs = ({ hotnftdata }) => {

  const [loading, setLoading] = useState(false)
  const [sold, setsold] = useState(0);

  const chainId = useChainId()

	// useEffect(() => {
	//   setLoading(true);
	//   const fetchData = async () => {

	//       try {

	//         const projectlink = process.env.NEXT_PUBLIC_SUPABASE_URL;
	//         const anonkey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	//         const supabase = createClient(projectlink, anonkey);

	//         const { data: selectdata } = await supabase.from("manager").select();

	//         console.log("inseted data", selectdata);

	//         // setCreatedGames(selectdata);
	//         } catch (error) {
	//           console.error('Error fetching reviews:', error);
	//         }
	//       }

	//   const fetchReviewsData = async () => {
	//     await fetchData();
	//   };

	//   fetchReviewsData().finally(() => setLoading(false));
	// }, []);


	  // ------------------------------------ how many items sold --------------------------------------------------------------


	  const fetch = async() => {

		try {
		  await Moralis.start({
			apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY
		  });
	
		  const response = await Moralis.EvmApi.events.getContractEvents({
			"chain": chainId,
			"order": "DESC",
			"topic": "0x328ff68d0e66694e405c9f8fc906a346b345aa1f87ec216eaa82f2c654d0d34a",
			"address": "0x2FB88a490b12B5bb5fD22d73D4bCD4B2F888b94d",
			"abi": {
		  "anonymous": false,
		  "inputs": [
			{
			  "indexed": false,
			  "name": "currentIndex",
			  "type": "uint256",
			  "internal_type": "uint256"
			},
			{
			  "indexed": false,
			  "name": "quantity",
			  "type": "uint256",
			  "internal_type": "uint256"
			},
			{
			  "indexed": true,
			  "name": "creator",
			  "type": "address",
			  "internal_type": "address"
			}
		  ],
		  "name": "PhygitalAAssetCreated",
		  "type": "event"
		}
		  });
		
		
		  console.log("response", response.raw, response.raw.result[0].data.currentIndex);
		  setsold(response.raw.result[0].data.currentIndex);
		} catch (e) {
		  console.error(e);
		}
	
	
	  }
	
	  useEffect(() => {
		fetch();
	  }, [])
	  
	
	  //----------------------------------------------------------------------------------------------------//

	return (
		<div>
			<div className='font-semibold' style={{ color: '#DF1FDD' }}>
				Most Loved NFTs Now
			</div>
			<div className='font-bold text-black text-6xl mt-10'>Hot NFTs</div>
			<div
				className='flex justify-between text-2xl'
				style={{ justifyContent: 'space-between' }}
			>
				<div className='mt-4'>
					Trending Treasures: Get in on the Action with These Phygitals Making Waves
					and Potentially Shaping the Future.
				</div>
				<button className="border"
        style={{
          background: "transparent",
          border: "6px solid transparent",
          borderRadius: "8px",
          backgroundImage: `
    linear-gradient(white, white),
    linear-gradient(to right, #AF40FF, #5B42F3, #00DDEB)
  `,
          backgroundOrigin: "border-box",
          backgroundClip: "content-box, border-box",
          WebkitBackgroundClip: "content-box, border-box", // For Safari
          display: "block",
          width: "180px",
          height: "50px",
        }}
        >View All</button>
			</div>

			<div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap', justifyContent:'center' }}>
        {hotnftdata?.slice(0, 8).map((nft, index) => (
          <HotNftCard key={index} nft={nft} sold={sold}/>
        ))}
      </div>

		</div>
	)
}

export default HotNFTs;
