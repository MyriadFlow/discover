'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import { useAccount, useDisconnect, useConnect } from 'wagmi'

const Header1 = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
	const { address, isConnected } = useAccount()
	const { connect, connectors } = useConnect()
	const { disconnect } = useDisconnect()
	const pathname = usePathname()
	const [name, setName] = useState('')
	const [profileImage, setProfileImage] = useState('')
	const [username, setUserName] = useState('')
	const [storedAddress, setStoredAddress] = useState(null)
	const menuRef = useRef(null)
	const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false)

	useEffect(() => {
		// Check for an existing wallet session in localStorage
		const savedAddress = localStorage.getItem('walletAddress')

		// Silently connect if there's a saved address but the user is not connected
		if (savedAddress && !isConnected) {
			connect({ connector: connectors[0] }) // Assuming InjectedConnector for MetaMask
		}

		// Manage session details in localStorage based on connection status
		// On connection, store wallet address in localStorage
		if (isConnected && !savedAddress) {
			localStorage.setItem('walletAddress', address)
		}
	}, [isConnected, address, connect, connectors])

	useEffect(() => {
		const getUserData = async () => {
			if (address) {
				try {
					const response = await fetch(
						`${baseUri}/profiles/wallet/${address}`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						}
					)

					if (response.ok) {
						const data = await response.json()
						setProfileImage(data.profile_image)
						setUserName(data.username)
						setName(data.name)
					} else {
						console.log('No user found')
					}
				} catch (error) {
					console.error('Error fetching user data', error)
				}
			}
		}
		getUserData()
	}, [address])

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0)
		}
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsDropdownOpen(false)
				setIsProfileMenuOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com'

	// const Notification = () => {
	//   if (!address) {
	//     toast.warning("Currently works with Metamask and Coinbase Wallet Extension. We are working on Smart Wallet functionality.", {
	//       containerId: "containerA",
	//       position: 'top-left',
	//     });
	//   }
	// };

	const handleLogout = () => {
		disconnect()
	}

	const getLinkColor = (path) => {
		return isScrolled ? (pathname === path ? 'rgba(223, 31, 221, 1)' : 'white') : (pathname === path ? 'rgba(48, 216, 255, 1)' : 'black')
	}

	return (
		<>
			<div
				className={`fixed top-0 w-full sm:px-10 py-4 bg-black text-white transition-all duration-300 ease-in-out ${isScrolled ? 'bg-black' : 'bg-transparent'
					} z-50`}
			>
				<div className=' flex justify-between items-center'>
					<a href='/' className='flex items-center'>
						<img
							src={isScrolled ? '/logo2.png' : '/logo.png'}
							className='w-32 sm:w-56'
							alt='Logo'
						/>
					</a>
					<div className='relative ml-80'>
						<button
							onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
							className='flex items-center text-xl font-bold'
							style={{ color: isScrolled ? (pathname === '/' ? 'white' : getLinkColor(pathname)) : (pathname === '/' ? 'black' : getLinkColor(pathname)) }}
						>
							Explore
							<img
								src={isScrolled ? '/pinkdrop.png' : '/drop.png'}
								alt='Arrow'
								className='inline-block ml-2 mt-1'
								style={{ width: '18px', height: '16px' }}
							/>
						</button>
						{isExploreDropdownOpen && (
							<div
								className={`absolute left-0 mt-10 p-2 rounded-lg shadow-lg w-48 text-xl font-bold ${isScrolled ? 'bg-black text-white' : 'bg-white text-black'}`}
							>
								<Link href='/collections' className='block px-4 py-2 text-xl hover:bg-gray-200'>
									Collections
								</Link>
								<Link href='/brands' className='block px-4 py-2 text-xl hover:bg-gray-200'>
									Brands
								</Link>
								<Link href='/users' className='block px-4 py-2 text-xl hover:bg-gray-200'>
									Users
								</Link>
								<div style={{ borderBottom: '2px solid rgba(223, 31, 221, 1)', margin: '4px 0', width: '80%', marginLeft: '10%' }} />
								<Link href='/elevate-africa' className='block px-4 py-2 text-xl hover:bg-gray-200'>
									Elevate
								</Link>
							</div>
						)}
					</div>
					<div className='hidden sm:flex items-center space-x-8 text-xl font-bold'>
						<Link
							href='https://discover.myriadflow.com'
							style={{ color: getLinkColor('/') }}
						>
							Discover
						</Link>
						<Link
							href='https://webxr.myriadflow.com'
							style={{ color: getLinkColor('') }}
						>
							WebXR
						</Link>
						<Link href='https://studio.myriadflow.com'
							style={{ color: getLinkColor('') }}
						>
							Studio
						</Link>
						<Link
							href='https://myriadflow.com'
							style={{ color: getLinkColor('') }}
							target='_blank' // Open in a new tab
							rel='noopener noreferrer' // Security best practice
						>
							Home
							<img
								src={isScrolled ? '/whitearrow.png' : '/arrow.png'}
								alt='Arrow'
								className='inline-block ml-2 -mt-1'
								style={{ width: '12px', height: '12px' }}
							/>
						</Link>
					</div>
					<div className='flex items-center space-x-4'>
						{address ? (
							<>
								<div className='relative'>
									<button
										onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
										className='focus:outline-none'
									>
										<img
											src={
												profileImage
													? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}`
													: '/profile.png'
											}
											alt='Profile'
											className='w-10 h-10 rounded-full'
										/>
									</button>
									{isProfileMenuOpen && (
										<div className='absolute sm:right-0 mt-2 p-2 sm:p-4 bg-white text-black rounded-lg shadow-lg w-64'>
											<div className='flex items-center mb-4'>
												<img
													src={
														profileImage
															? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}`
															: '/profile.png'
													}
													alt='Profile'
													className='w-10 h-10 rounded-full mr-2'
												/>
												<div>
													<span className='block text-sm font-semibold'>
														{name}
													</span>
													<Link
														href={`/${username}`}
														className='text-xs text-gray-500 hover:underline'
													>
														View profile
													</Link>
												</div>
											</div>
											<Link
												href={`/${username}`}
												className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
											>
												My assets
											</Link>
											<Link
												href={`/${username}`}
												className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
											>
												On sale
											</Link>
											<Link
												href={`/${username}`}
												className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
											>
												My brands
											</Link>
											<Link
												href={`/${username}`}
												className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
											>
												My collections
											</Link>
											<Link
												href={`/${username}`}
												className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
											>
												Activity
											</Link>
											<Link
												href={`/${username}`}
												className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
											>
												Rewards
											</Link>
											<Link
												href='https://studio.myriadflow.com'
												target='_blank'
												rel='noopener noreferrer'
												className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
											>
												Create
											</Link>
											<Link
												href='/profile-setting'
												className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
											>
												Profile Settings
											</Link>
											<div className='border-t border-gray-200 my-2'></div>
											<button
												onClick={handleLogout}
												className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left'
											>
												Log out
											</button>
											<div className='mt-2 flex items-center justify-between px-4 py-2 text-xs text-gray-500'>
												<span className='flex-1 truncate'>{address}</span>
												<button
													onClick={() => {
														navigator.clipboard
															.writeText(address)
															.then(() => {
																alert('Address copied to clipboard!')
															})
															.catch((err) => {
																console.error('Failed to copy address:', err)
															})
													}}
													className='ml-2 text-blue-500 hover:text-blue-700'
												>
													Copy
												</button>
											</div>
										</div>
									)}
								</div>
								<button className='text-xl'>
									<img
										src={isScrolled ? '/notification.png' : '/bluenotification.png'}
										alt='Notification'
										className='w-10 h-10'
									/>
								</button>
								<Link href='/cart'>
									<button className='text-xl'>
										<img
											src={isScrolled ? '/cart.png' : '/bluecart.png'}
											alt='Cart'
											className='w-10 h-10 mt-2'
										/>
									</button>
								</Link>
							</>
						) : (
							// <button onClick={Notification} className="text-xl">
							<w3m-button />
							// </button>
						)}
					</div>
					<button
						className='sm:hidden text-2xl'
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					>
						<img src='/menu.png' alt='Menu' className='w-6 h-6 ml-4' />
					</button>
				</div>
				{isDropdownOpen && (
					<div
						ref={menuRef}
						className='sm:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-40'
					>
						<div className='flex flex-col items-center justify-center h-full  bg-transparent text-black relative'>
							<button
								onClick={() => setIsDropdownOpen(false)}
								className='absolute top-4 right-4 text-xl text-gray-700'
							>
								<img src='/close.png' alt='Close' className='w-12 h-12' />
							</button>
							<Link
								href='https://myriadflow.com'
								style={{ color: getLinkColor('/') }}
								className='block py-2 text-lg'
							>
								Home
							</Link>
							<Link
								href='/#movetotrends'
								style={{ color: getLinkColor('/#movetotrends') }}
								className='block py-2 text-lg'
							>
								Explore
							</Link>
							<Link
								href='/collections'
								style={{ color: getLinkColor('/collections') }}
								className='block py-2 text-lg'
							>
								Collections
							</Link>
							<Link
								href='/brands'
								style={{ color: getLinkColor('/brands') }}
								className='block py-2 text-lg'
							>
								Brands
							</Link>
							<Link
								href='/users'
								style={{ color: getLinkColor('/users') }}
								className='block py-2 text-lg'
							>
								Users
							</Link>
						</div>
					</div>
				)}
			</div>
			<ToastContainer
				className='absolute top-0 right-0'
				containerId='containerA'
			/>
		</>
	)
}

export default Header1
