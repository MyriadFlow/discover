'use client'
import React, { useState, useEffect } from 'react'
import MostRecentlyCard from './mostRecentlyCard'
import { createClient } from '@supabase/supabase-js'

const hotNFTs = () => {
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
				Most Loved NFTs Now
			</div>
			<div className='font-bold text-black text-6xl mt-10'>Hot NFTs</div>
			<div
				className='flex justify-between text-2xl'
				style={{ justifyContent: 'space-between' }}
			>
				<div className='mt-4'>
					Trending Treasures: Get in on the Action with These NFTs Making Waves
					and Potentially Shaping the Future.
				</div>
				<button className='border py-3 px-10'>View All</button>
			</div>

			<div className='mt-10 flex' style={{ gap: '40px' }}>
				<MostRecentlyCard />
				<MostRecentlyCard />
				<MostRecentlyCard />
				<MostRecentlyCard />
			</div>

			<div className='mt-10 flex' style={{ gap: '40px' }}>
				<MostRecentlyCard />
				<MostRecentlyCard />
				<MostRecentlyCard />
				<MostRecentlyCard />
			</div>
		</div>
	)
}

export default hotNFTs
