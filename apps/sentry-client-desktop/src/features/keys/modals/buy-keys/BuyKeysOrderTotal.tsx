import {BiLoaderAlt} from "react-icons/bi";
import {AiFillInfoCircle, AiOutlineClose, AiOutlineInfoCircle} from "react-icons/ai";
import {useGetPriceForQuantity} from "@/features/keys/hooks/useGetPriceForQuantity";
import {useGetTotalSupplyAndCap} from "@/features/keys/hooks/useGetTotalSupplyAndCap";
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {Tooltip} from "@/features/keys/Tooltip";

interface BuyKeysOrderTotalProps {
	quantity: number;
}

export function BuyKeysOrderTotal({quantity}: BuyKeysOrderTotalProps) {
	const {data: getPriceData, isLoading: isPriceLoading} = useGetPriceForQuantity(quantity);
	const {isLoading: isTotalLoading} = useGetTotalSupplyAndCap();
	const [discountApplied, setDiscountApplied] = useState<boolean>(false);
	const [discountError, setDiscountError] = useState<boolean>(false);
	const [promo, setPromo] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState('');
	const [price, setPrice] = useState<{ price: number, discount: number }>({price: 0, discount: 0});

	useEffect(() => {
		if (getPriceData) {
			setPrice({
				price: Number(ethers.formatEther(getPriceData.price)),
				discount: ((5 / 100) * Number(ethers.formatEther(getPriceData.price))) * -1
			});
		}
	}, [getPriceData]);

	const handleSubmit = () => {
		setDiscountError(false);
		if (inputValue === "IDONTWANNAPAYFULLPRICE") {
			setDiscountApplied(true);
		} else {
			setDiscountError(true);
			setInputValue("");
		}
	};

	function getKeys() {
		if (!getPriceData) {
			return
		}

		return getPriceData.nodesAtEachPrice.map((item, i) => {
			return (
				<div key={`get-keys-${i}`}>
					<div className="flex flex-row items-center justify-between text-[15px]">
						<div className="flex flex-row items-center gap-2">
							<span className="">{Number(item.quantity)} x Xai Sentry Node Key</span>
						</div>
						<div className="flex flex-row items-center gap-1">
							<span
								className="font-semibold">{Number(ethers.formatEther(item.totalPriceForTier))} ETH</span>
						</div>
					</div>
					<p className="text-[13px] text-[#A3A3A3] mb-4">
						{Number(ethers.formatEther(item.pricePer))} ETH per key
					</p>
				</div>
			)
		})
	}

	return (
		<>
			{isPriceLoading || isTotalLoading || !getPriceData
				? (
					<div className="w-full h-screen flex flex-col justify-center items-center">
						<BiLoaderAlt className="animate-spin" color={"#A3A3A3"} size={32}/>
						<p>Updating total...</p>
					</div>
				) : (
					<>
						<div className="w-full flex flex-col gap-4">
							<div className="w-full items-center gap-2">
								<div className="w-full">
									<hr/>
								</div>
								<div className="w-12 flex flex-row text-sm text-[#A3A3A3] mt-4 px-6">
									<p className="flex items-center gap-1">
										TOTAL
										<Tooltip
											body={"All purchases must be made in Arbitrum ETH"}
											minWidth={337}
										>
											<AiOutlineInfoCircle size={16}/>
										</Tooltip>
									</p>
								</div>
							</div>

							<div className="px-6">
								{getKeys()}

								{discountApplied && (
									<>
										<div className="flex flex-row items-center justify-between text-[15px]">
											<div className="flex flex-row items-center gap-2">
												<span>Discount (5%)</span>

												<a
													onClick={() => setDiscountApplied(false)}
													className="text-[#F30919] ml-1 cursor-pointer"
												>
													Remove
												</a>

											</div>
											<div className="flex flex-row items-center gap-1">
												<span className="text-[#2A803D] font-semibold">
													{price.discount} ETH
												</span>
											</div>
										</div>
										<p className="text-[13px] text-[#A3A3A3] mb-4">
											IDONTWANNAPAYFULLPRICE
										</p>
									</>
								)}

								{getPriceData.nodesAtEachPrice.length > 1 && (
									<div className="w-full flex flex-col bg-[#F5F5F5] px-5 py-4 gap-2 mb-4">
										<div className="flex items-center gap-2 font-semibold">
											<AiFillInfoCircle className="w-[20px] h-[20px] text-[#3B82F6]"/>
											<p className="text-[15px]">
												Prices may vary
											</p>
										</div>
										<p className="text-sm">
											Xai Sentry Node Key prices vary depending on the quantity of remaining
											supply.
											In general, as the quantity of available keys decreases, the price of a key
											will
											increase.
										</p>
									</div>
								)}

								{/*		Promo section		*/}
								{!discountApplied && (
									<>
										<hr className="my-2"/>
										{promo ? (
											<div>
												<div
													className="w-full h-auto flex flex-row justify-between items-center text-[15px] text-[#525252] mt-2 py-2">
													<span>Add promo code</span>
													<div
														className="cursor-pointer z-10"
														onClick={() => setPromo(false)}
													>
														<AiOutlineClose/>
													</div>
												</div>

												<div className="flex gap-2 items-center">

													<input
														type="text"
														value={inputValue}
														onChange={(e) => {
															setInputValue(e.target.value)
															setDiscountError(false);
														}}
														className={`w-full my-2 p-2 border ${discountError ? "border-[#AB0914]" : "border-[#A3A3A3]"}`}
														placeholder="Enter promo code"
													/>

													<button
														onClick={() => handleSubmit()}
														className="flex flex-row justify-center items-center w-[92px] p-2 bg-[#F30919] text-[15px] text-white font-semibold uppercase"
													>
														Apply
													</button>
												</div>

												{discountError && (
													<p className="text-[14px] text-[#AB0914]">Invalid referral
														address</p>
												)}
											</div>
										) : (
											<p className="text-[15px] py-2">
												<a
													onClick={() => setPromo(true)}
													className="text-[#F30919] ml-1 cursor-pointer"
												>
													+ Add promo code
												</a>
											</p>
										)}
									</>
								)}

								<hr className="my-2"/>
								<div className="flex flex-row items-center justify-between">
									<div className="flex flex-row items-center gap-2 text-lg">
										<span className="">You pay</span>
									</div>
									<div className="flex flex-row items-center gap-1 font-semibold">
										<span>
											{price.discount
												? Number(price.price - price.discount)
												: price.price}
										</span>
										<span>ETH</span>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
		</>
	)
}
