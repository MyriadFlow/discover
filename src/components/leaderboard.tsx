'use client'
import { Avatar } from '@readyplayerme/visage'
import Link from 'next/link'
import { useQueries, useQuery } from '@tanstack/react-query'
import { getAvatars, getFanTokens, getPhygitals } from '@/utils/queries'
import { AvatarType, FanTokenType } from '@/types/types'
import Image from 'next/image'
import { getFanMainTokens } from '../utils/queries'
import { useState } from 'react'

const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com'

const Leaderboard = () => {
	const [count, setCount] = useState<number[]>([])

	const results = useQueries({
		queries: [
			{
				queryKey: ['avatars'],
				queryFn: getAvatars,
			},
			{
				queryKey: ['mainFanTokens'],
				queryFn: async () => {
					const results = await getFanMainTokens();
					// Count occurrences of each contract address
					const addressCount = results.reduce((acc: Record<string, number>, token: any) => {
						const address = token.nftContractAddress;  // Use the correct property name here
						acc[address] = (acc[address] || 0) + 1;
						return acc;
					}, {});

					// Find top 3 addresses with the highest counts
					const topThree = Object.entries(addressCount as Record<string, number>)
						.sort(([, countA], [, countB]) => countB - countA)
						.slice(0, 3)  // Take the top 3 items
						.map(([address, count]) => ({ address, count })); // Return only the addresses

					const topThreeAddresses = topThree.map((item: any) => item.address);
					const counts = topThree.map((item: any) => item.count);
					setCount(counts as number[]);

					const allPhygitals = await getPhygitals();

					// Filter phygitals by top 3 addresses and extract the ids
					const filteredPhygitalIds = allPhygitals
						.filter((phygital: any) => {
							const match = topThreeAddresses.includes(phygital.contract_address);
							return match;
						})
						.map((phygital: any) => phygital.id);

					const allAvatars = await getAvatars();
					const matchedAvatars = allAvatars
						.filter((avatar: any) => {
							const match = filteredPhygitalIds.includes(avatar.phygital_id);
							return match;
						})
						.map((avatar: any) => avatar);
					return matchedAvatars;
				},
			},
			{
				queryKey: ['fanTokens'],
				queryFn: getFanTokens,
			},

		],
	})

	const [avatarsResult, fanTokenMainResults, fanTokenResults] = results

	// const topAvatarsResult = useQuery({
	// 	queryKey: ['topAvatars'],
	// 	queryFn: () => getTopAvatars(avatarsResult.data, fanTokenResults.data),
	// })

	const topAvatars = fanTokenMainResults.data

	return (
		<div className='p-4 sm:p-6 lg:p-10'>
			<div className='font-bold text-3xl sm:text-4xl lg:text-6xl mx-20'>
				Avatar Leaderboard
			</div>
			<div className='flex flex-col sm:flex-row justify-between text-lg sm:text-xl lg:text-2xl mt-4 px-4 sm:px-4 mx-16'>
				<div className='mt-4'>
					This Week&apos;s Top Performing AI-Powered Brand Ambassadors
				</div>
				<Link
					href='https://webxr.myriadflow.com'
					target='_blank'
					rel='noopener noreferrer'
					className='border'
					style={{
						background: 'transparent',
						border: '6px solid transparent',
						borderRadius: '8px',
						backgroundImage: `
							linear-gradient(white, white),
							linear-gradient(to right, #AF40FF, #5B42F3, #00DDEB)
						`,
						backgroundOrigin: 'border-box',
						backgroundClip: 'content-box, border-box',
						WebkitBackgroundClip: 'content-box, border-box', // For Safari
						display: 'block',
						width: '180px',
						height: '50px',
						textAlign: 'center',
					}}
				>
					<div style={{ marginTop: '4px' }}>View All
						<img
							src={'arrow.png'}
							alt='Arrow'
							className='inline-block ml-2 -mt-2'
							style={{ width: '15px', height: '15px' }}
						/>
					</div>
				</Link>
			</div>
			<div className='flex flex-col lg:flex-row justify-center items-center mt-10' style={{
				backgroundImage: "url('./leaderboard_background.png')",
				backgroundSize: 'cover',
				height: '600px'
			}}>

				{topAvatars && (
					<>
						{/* Silver */}
						<div className='h-max md:h-[30rem] w-full md:w-1/3 flex flex-col items-center justify-center mb-10 md:mb-0 '>
							{topAvatars?.[1] && (
								<>
									<Avatar
										modelSrc={topAvatars?.[1].url!}
										cameraInitialDistance={2.5}
									/>
									<div className='relative mt-4'>
										<Image
											height={150}
											width={150}
											src='/silver.png'
											alt='Silver'
											className='w-full h-auto object-cover'
										/>
									</div>
									<div>
										<div className='text-black flex gap-4 items-center justify-center mt-4 text-xl'>
											<Image src='/star.png' alt='star' width={20} height={20} />
											{count[1] * 100}
											<Image src='/star.png' alt='star' width={20} height={20} />
										</div>
										<p className='text-center text-xl text-black mb-4'>
											star points
										</p>
									</div>

									<Link
										href={`https://webxr.myriadflow.com/${topAvatars?.[1].phygital_id}`}
									>
										<div className='bg-gradient-to-b from-[#999999] to-[#DD21DD]  text-center text-2xl px-4 py-2 rounded-full border border-black bg-white cursor-pointer hover:bg-gray-200'>
											WEBXR
										</div>
									</Link>
								</>
							)}
							<div className='h-12'></div>
						</div>

						{/* Gold */}
						<div className='h-max md:h-[35rem] w-full md:w-1/3 flex flex-col items-center justify-center mb-10 md:mb-0'>
							{topAvatars?.[0] && (
								<>
									<Avatar
										modelSrc={topAvatars?.[0].url!}
										cameraInitialDistance={3}
									/>
									<div className='relative mt-4'>
										<Image
											height={150}
											width={150}
											src='/gold.png'
											alt='Gold'
											className='w-full h-auto object-cover'
										/>
									</div>
									<div>
										<div className='text-black flex gap-4 items-center justify-center mt-4 text-xl'>
											<Image src='/star.png' alt='star' width={20} height={20} />
											{count[0] * 100}
											<Image src='/star.png' alt='star' width={20} height={20} />
										</div>
										<p className='text-center text-xl text-black mb-4'>
											star points
										</p>
									</div>
									<Link
										href={`https://webxr.myriadflow.com/${topAvatars?.[0].phygital_id}`}
									>
										<div className='bg-gradient-to-b from-[#999999] to-[#DD21DD]  text-center text-2xl px-4 py-2 rounded-full border border-black bg-white cursor-pointer hover:bg-gray-200'>
											WEBXR
										</div>
									</Link>
								</>
							)}
							<div className='h-28'></div>
						</div>

						{/* Bronze */}
						<div className='h-max md:h-[30rem] w-full md:w-1/3 flex flex-col items-center justify-center'>
							{topAvatars?.[2] && (
								<>
									<Avatar
										modelSrc={topAvatars?.[2].url!}
										cameraInitialDistance={0.5}
									/>
									<Image
										height={150}
										width={150}
										src='/bronze.png'
										alt='Bronze'
										className='w-3/5 object-cover mt-4'
									/>
									<div>
										<div className='text-black flex gap-4 items-center justify-center mt-4 text-xl'>
											<Image src='/star.png' alt='star' width={20} height={20} />
											{count[2] * 100}
											<Image src='/star.png' alt='star' width={20} height={20} />
										</div>
										<p className='text-center text-xl text-black mb-4'>
											star points
										</p>
									</div>

									<Link
										href={`https://webxr.myriadflow.com/${topAvatars?.[2].phygital_id}`}
									>
										<div className='bg-gradient-to-b from-[#999999] to-[#DD21DD] text-center text-2xl px-4 py-2 rounded-full border border-black bg-white cursor-pointer hover:bg-gray-200'>
											WEBXR
										</div>
									</Link>
								</>
							)}
						</div>
					</>
				)}
			</div>

			<div className='relative bg-black'>
				<img
					src='./trophy1.png'
					alt='Left'
					className='absolute top-0 left-4 lg:left-10 transform -translate-y-1/2 w-24 h-24 lg:w-32 lg:h-32'
				/>
				<img
					src='./trophy2.png'
					alt='Right'
					className='absolute top-0 right-4 lg:right-10 transform -translate-y-1/2 w-24 h-24 lg:w-32 lg:h-32'
				/>
				<div className='text-center text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 py-4 bg-black'>
					Rewarding Creators, Owners and Supporters.
				</div>
			</div>
		</div>
	)
}

export default Leaderboard
