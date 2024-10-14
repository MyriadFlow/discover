import type { Metadata } from 'next'
import { Bai_Jamjuree as FontSans } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'

import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'
import Providers from '@/lib/providers'
import { config } from '@/lib/wagmi'
import AppKitProvider from '@/lib/providers'


const fontSans = FontSans({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-sans',
})
export const metadata: Metadata = {
	title: 'Discover | MyriadFlow',
	description: 'Own the future of collecting! MyriadFlow Discover lets you buy, sell, and showcase unique phygital NFTs. Explore immersive VR experiences that bring your digital collectibles to life.',
	openGraph: {
	  type: 'website',
	  url: 'https://discover.myriadflow.com',
	  title: 'Discover | MyriadFlow',
	  description: 'Own the future of collecting! MyriadFlow Discover lets you buy, sell, and showcase unique phygital NFTs. Explore immersive VR experiences that bring your digital collectibles to life.',
	  images: [
		{
		  url: 'https://opengraph.b-cdn.net/production/images/b8d63114-1c81-47e6-810d-740b32eef545.jpg?token=s6gIm_7zSPm9TQ972FNZdF14HcTS7Nhk0XPSLOr2ut0&height=750&width=1200&expires=33264930918',
		  width: 1200,
		  height: 750,
		  alt: 'MyriadFlow Discover',
		},
	  ],
	},
	twitter: {
	  card: 'summary_large_image',
	  site: '@MyriadFlow',
	  title: 'Discover | MyriadFlow',
	  description: 'Own the future of collecting! MyriadFlow Discover lets you buy, sell, and showcase unique phygital NFTs. Explore immersive VR experiences that bring your digital collectibles to life.',
	  images: [
		'https://opengraph.b-cdn.net/production/images/b8d63114-1c81-47e6-810d-740b32eef545.jpg?token=s6gIm_7zSPm9TQ972FNZdF14HcTS7Nhk0XPSLOr2ut0&height=750&width=1200&expires=33264930918',
	  ],
	},
  }

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const initialState = cookieToInitialState(config, headers().get('cookie'))
	return (
		<html lang='en' suppressHydrationWarning>
			<Providers>
				<body
					className={cn(
						'min-h-screen bg-[#FAF9F6] font-sans antialiased',
						fontSans.variable
					)}
				>
				<AppKitProvider initialState={initialState}>{children}</AppKitProvider>
				</body>
			</Providers>
		</html>
	)
}