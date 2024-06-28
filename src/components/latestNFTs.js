'use client'
import React, { useState, useEffect } from 'react'
import HotNftCard from './hotNftCard'
import { createClient } from '@supabase/supabase-js'

const LatestNFTs = ({ hotnftdata }) => {

  const [loading, setLoading] = useState(false)

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

	return (
		<div>
			<div className='font-semibold' style={{ color: '#DF1FDD' }}>
            Most Recently Launched
			</div>
			<div className='font-bold text-black text-6xl mt-10'>New on Discover</div>
			<div
				className='flex justify-between text-2xl'
				style={{ justifyContent: 'space-between' }}
			>
				<div className='mt-4'>
                New Frontier: Be Among the First to Discover the Newest Phygitals Making Their Debut!
				</div>
				<button className='border py-3 px-10'>View All</button>
			</div>

			<div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap', justifyContent:'center' }}>
        {hotnftdata?.slice(-8).reverse().map((nft, index) => (
          <HotNftCard key={index} nft={nft} />
        ))}
      </div>

		</div>
	)
}

export default LatestNFTs;
