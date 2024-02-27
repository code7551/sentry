"use client"

import { Navbar, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "../buttons/ButtonsComponent";
import { LinkLogoComponent } from "../links/LinkComponent";
import { Discord, ErrorCircle, GitBook, Telegram, X, Xai } from "../icons/IconsComponent";
import { getNetwork } from "@/services/web3.service";



export default function NavbarComponent() {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const { open } = useWeb3Modal();
	const { address, chainId } = useAccount();
	const isTestnet = getNetwork(chainId||42161) == "arbitrumSepolia";
	
	return (
		<Navbar isBordered maxWidth="full"
			className={`flex border-b-1 border-silverMist bg-lightWhiteDarkBlack mb-5`}
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={() => setIsMenuOpen(!isMenuOpen)}
		>
			<NavbarContent className="lg:hidden" justify="start">
				<NavbarMenuToggle />
				<div className='flex items-center ml-1'>
					<span className='pb-[6px]'><Xai /></span>
					<Link href="/"><div className='text-lg text-lightBlackDarkWhite font-bold py-2 pl-2'>Xai</div></Link>
				</div>
			</NavbarContent>
			<NavbarContent justify="start">
			</NavbarContent>
			<NavbarContent className="" justify="end">
				{isTestnet && <><ErrorCircle/><span className="text-[#ED5F00]">TESTNET</span></>}<ConnectButton onOpen={open} address={address} />
			</NavbarContent>
			<NavbarMenu className="flex flex-col justify-between bg-lightWhiteDarkBlack">
				<NavbarMenuItem>
					<div className="">
						<div className='flex flex-col'>
							<Link href="/" onClick={() => setIsMenuOpen(false)}><div className='text-base text-lightBlackDarkWhite py-2 pl-4'>Overview</div></Link>
							<Link href="/staking" onClick={() => setIsMenuOpen(false)}><div className='text-base text-lightBlackDarkWhite py-2 pl-4'>Staking</div></Link>
							<Link href="/redeem" onClick={() => setIsMenuOpen(false)}><div className='text-base text-lightBlackDarkWhite py-2 pl-4'>Redeem</div></Link>
						</div>
					</div>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<div className='mb-5'>
						<LinkLogoComponent link="https://xai-foundation.gitbook.io/xai-network/xai-blockchain/welcome-to-xai" content='GitBook' Icon={GitBook} />
						<LinkLogoComponent link="https://discord.com/invite/xaigames" content='Discord' Icon={Discord} />
						<LinkLogoComponent link="https://twitter.com/xai_games" content='X' Icon={X} />
						<LinkLogoComponent link="https://t.me/XaiSentryNodes" content='Telegram' Icon={Telegram} />
					</div>
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	)
}