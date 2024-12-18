"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { Avatar } from "@readyplayerme/visage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { abi } from "../../../components/abi/abi";
import { useAccount, useChainId } from "wagmi";
import Moralis from "moralis";
import Header1 from "@/components/header1";
import axios from "axios";
import Footer from "@/components/footer";
import { FaTwitter, FaInstagram, FaCopy } from "react-icons/fa";
import { ProvenanceAttestation } from "@/components/provenance-attestation";
const NFTPage = ({ params }) => {
  const id = params?.id
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const [isHovered, setIsHovered] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [priceUSD, setPriceUSD] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatar, setAvatar] = useState("");
  const [logos, setLogos] = useState("");
  const [brandDesc, setbrandDesc] = useState("");
  const [brandid, setbrandid] = useState("");
  const [name, setbrandName] = useState("");
  const [loading, setLoading] = useState(false);
  const [sold, setsold] = useState(0);
  const [owner, setOwner] = useState(false);
  const [mintedNFTs, setMintedNFTs] = useState([]);

  const [showProvenance, setShowProvenance] = useState(false);

  const togglePopup = () => {
    setShowProvenance(!showProvenance);
  };

  const chainId = useChainId();
  const account = useAccount();
  const walletAddress = account.address;
  const apikey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  const baseUri = process.env.NEXT_PUBLIC_URI || "https://app.myriadflow.com";

  const [activeTab, setActiveTab] = useState("Color"); // Default tab

  const tabs = [
    "Color",
    "Size",
    "Weight",
    "Material",
    "Usage",
    "Unique Qualities",
    "Manufacturer",
    "Made In",
  ];

  const handleClaimClick = () => {
    setShowPopover(true);
    setTimeout(() => {
      setShowPopover(false);
    }, 6000); // Pop-over will disappear after 3 seconds
  };

  const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === "development";

  const apiUrl = isDevelopment
    ? "http://localhost:3000" // Local development URL
    : "https://discover.myriadflow.com"; // Production URL

  const [onephygital, setonePhygital] = useState([]);

  const [selectedImage, setSelectedImage] = useState(
    `https://nftstorage.link/ipfs/${onephygital?.image?.slice(7)}`
  );
  const [showLightbox, setShowLightbox] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const getBrands = async () => {
    setLoading(true);

    const baseUri = process.env.NEXT_PUBLIC_URI || "https://app.myriadflow.com";

    const nfts = await fetch(
      `${baseUri}/phygitals/all/554b4903-9a06-4031-98f4-48276c427f78`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const phynfts = await nfts.json();

    const matchedNft = phynfts.find((nft) => nft.name === id);
    if (matchedNft) {
      const NftId = matchedNft.id;

      const phyres = await fetch(`${baseUri}/phygitals/${NftId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const phyresult = await phyres.json();
      // setOwner(phyresult.deployer_address)
      setonePhygital(phyresult);

      const avatar = await fetch(
        `${baseUri}/avatars/all/554b4903-9a06-4031-98f4-48276c427f78`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const avatardata = await avatar.json();

      const selectedAvatar = avatardata.find(
        (avatar) => avatar.phygital_id === NftId
      );

      // If found, update the state with the avatar URL
      if (selectedAvatar) {
        setAvatar(selectedAvatar);
        setAvatarUrl(selectedAvatar.url);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString(); // You can customize the format further if needed
  };

  useEffect(() => {
    const pricetoUSD = async () => {
      // Fetch the current ETH to USD conversion rate
      const conversionRateRes = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );

      if (!conversionRateRes.ok) {
        throw new Error("Failed to fetch ETH to USD conversion rate");
      }

      const conversionRateResult = await conversionRateRes.json();
      const ethToUsdRate = conversionRateResult.ethereum.usd;

      const lowestPriceInUSD = onephygital?.price * ethToUsdRate;
      setPriceUSD(lowestPriceInUSD.toFixed(2));
    };

    pricetoUSD();
  }, [onephygital]);

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const copyInstagramContent = () => {
    const url = window.location.href;
    const instagramText = `✨ Check out this amazing Phygital NFT!\n\n${onephygital?.name}\n\nDiscover more at: ${url}\n\n#Myriadflow #PhygitalNFT #NFTCommunity #Web3 #DigitalCollectibles`;

    navigator.clipboard.writeText(instagramText);
    toast.success("Instagram caption copied to clipboard!");
    setShowShareOptions(false);
  };

  const shareOnTwitter = (url, text, imageUrl = "") => {
    const twitterBaseUrl = "https://twitter.com/intent/tweet";
    const twitterText = `Check this out🤩\nCoolest Phygital on Discover | Myriadflow✨\n\n${url}\n\n#Myriadflow #Discover #Phygitals #NFTs #Collections\n`;
    const params = new URLSearchParams({
      text: twitterText,
    });
    window.open(`${twitterBaseUrl}?${params.toString()}`, "_blank");
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    const copyText = `🌟 Discovered something amazing on MyriadFlow!\n\n${onephygital?.name}\n${onephygital?.description}\n\nCheck it out here: ${url}\n\n#MyriadFlow #PhygitalNFT #DigitalCollectibles`;

    navigator.clipboard.writeText(copyText);
    toast.success("Content copied to clipboard!");
    setShowShareOptions(false);
  };

  useEffect(() => {
    const brandmatch = async () => {
      const baseUri =
        process.env.NEXT_PUBLIC_URI || "https://app.myriadflow.com";

      try {
        const res = await fetch(
          `${baseUri}/brands/all/554b4903-9a06-4031-98f4-48276c427f78`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();

        const matchedBrand = result.find(
          (brand) => brand.name === onephygital.brand_name
        );
        if (matchedBrand) {
          setLogos(matchedBrand.logo_image);
          setbrandDesc(matchedBrand.description);
          setbrandid(matchedBrand.id);
          setbrandName(matchedBrand.name);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    brandmatch();
  }, [onephygital]);

  useEffect(() => {
    const fetch = async () => {
      try {
        // await Moralis.start({
        //   apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY
        // });

        const response = await Moralis.EvmApi.events.getContractEvents({
          chain: chainId,
          order: "DESC",
          topic:
            "0x328ff68d0e66694e405c9f8fc906a346b345aa1f87ec216eaa82f2c654d0d34a",
          address: `${onephygital?.contract_address}`,
          abi: {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                name: "currentIndex",
                type: "uint256",
                internal_type: "uint256",
              },
              {
                indexed: false,
                name: "quantity",
                type: "uint256",
                internal_type: "uint256",
              },
              {
                indexed: true,
                name: "creator",
                type: "address",
                internal_type: "address",
              },
            ],
            name: "PhygitalAAssetCreated",
            type: "event",
          },
        });

        if (response.raw.result[0]) {
          setsold(response.raw.result[0].data.currentIndex);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetch();
  }, [onephygital]);

  const buyasset = async () => {
    setLoading(true);

    try {
      if (typeof window !== "undefined" && window.ethereum && walletAddress) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
          `${onephygital?.contract_address}`,
          abi,
          provider.getSigner()
        );

        const tx = await contract.mint(1, {
          value: ethers.utils.parseEther(onephygital?.price.toString()),
        });
        const result = await tx.wait();
        setLoading(false);
        window.location.href = `/confirm/${id}`;
      } else {
        toast.warning("Connect your wallet");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error handling buy asset:", error);
      setLoading(false); // Set loading state to false in case of error
    }
  };

  const handleAddToCart = async () => {
    const cartItem = {
      phygital_id: onephygital.id,
      wallet_address: walletAddress,
      quantity: 1,
      name: onephygital.name,
      price: onephygital.price,
      image: onephygital.image,
      logo: logos,
    };
    const baseUri = process.env.NEXT_PUBLIC_URI || "https://app.myriadflow.com";
    if (walletAddress) {
      try {
        const response = await axios.get(`${baseUri}/cart/${walletAddress}`);
        const cartItems = response.data;

        const existingItem = cartItems.find(
          (item) => item.phygital_id === onephygital.id
        );

        if (existingItem) {
          await axios.post(`${baseUri}/cart`, {
            phygital_id: onephygital.id,
            wallet_address: walletAddress,
            quantity: existingItem.quantity + 1,
          });
        } else {
          await axios.post(`${baseUri}/cart`, cartItem);
        }

        toast.success("Added to Cart!");
      } catch (error) {
        toast.error("Failed to add to cart. Please try again.");
        console.error("Error adding to cart:", error);
      }
    } else {
      toast.warning("Connect your wallet");
    }
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        await Moralis.start({ apiKey: apikey });

        const assets = await Moralis.EvmApi.nft.getWalletNFTs({
          chain: chainId,
          format: "decimal",
          mediaItems: false,
          address: walletAddress,
        });

        setMintedNFTs(assets.raw.result);
        console.log("NFTs:", assets.raw.result);
      } catch (e) {
        console.error(e);
      }
    };

    if (walletAddress && chainId) {
      fetchNFTs();
    }
  }, [walletAddress, chainId, apikey]);

  useEffect(() => {
    const fetchPhygitals = async () => {
      try {
        const phyres = await fetch(
          `${baseUri}/phygitals/all/554b4903-9a06-4031-98f4-48276c427f78`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!phyres.ok) {
          throw new Error("Failed to fetch data");
        }

        const phyresult = await phyres.json();
        console.log("Phygitals:", phyresult);

        const matched = await Promise.all(
          phyresult.map(async (phygital) => {
            const amountBought = await mintedNFTs.reduce(
              async (countPromise, nft) => {
                const count = await countPromise;
                return (
                  count +
                  (nft?.token_address === phygital.contract_address ? 1 : 0)
                );
              },
              Promise.resolve(0)
            );
            return {
              ...phygital,
              amount_bought: amountBought,
            };
          })
        );

        const filteredMatched = matched.filter(
          (phygital) => phygital.amount_bought > 0
        );
        const nftMatched = filteredMatched.filter(
          (nft) => nft.id === onephygital.id
        );
        if (nftMatched.length > 0) {
          setOwner(true);
        }
        console.log("Matched NFTs:", filteredMatched);
        console.log("Matched NFTs 2:", nftMatched);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (mintedNFTs.length > 0) {
      fetchPhygitals();
    }
  }, [mintedNFTs, baseUri, onephygital.id]);

  return (
    <>
      {owner ? (
        <div>
          <Head>
            <title>Discover | MyriadFlow</title>
            <meta
              name="description"
              content="Own the future of collecting! MyriadFlow Discover lets you buy, sell, and showcase unique phygital NFTs. Explore immersive VR experiences that bring your digital collectibles to life."
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content={`https://discover.myriadflow.com/nfts/${onephygital?.id}`}
            />
            <meta property="og:title" content="Discover | MyriadFlow" />
            <meta
              property="og:description"
              content="Own the future of collecting! MyriadFlow Discover lets you buy, sell, and showcase unique phygital NFTs. Explore immersive VR experiences that bring your digital collectibles to life."
            />
            <meta
              property="og:image"
              content={`https://nftstorage.link/ipfs/${onephygital?.image?.slice(
                7
              )}`}
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@MyriadFlow" />
            <meta name="twitter:title" content="Discover | MyriadFlow" />
            <meta
              name="twitter:description"
              content="Own the future of collecting! MyriadFlow Discover lets you buy, sell, and showcase unique phygital NFTs. Explore immersive VR experiences that bring your digital collectibles to life."
            />
            <meta
              name="twitter:image"
              content={`https://nftstorage.link/ipfs/${onephygital?.image?.slice(
                7
              )}`}
            />
          </Head>
          <Header1 />
          <ToastContainer />
          <div className="flex flex-col lg:flex-row gap-10 mt-24 px-4 lg:px-10">
            <div className="w-full lg:w-1/3">
              <div className="flex justify-center">
                <img
                  src={selectedImage}
                  className="w-full h-auto max-w-[70vh] max-h-[70vh] object-cover cursor-pointer"
                  onClick={() => setShowLightbox(true)}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-2 mt-4">
                <div
                  className="w-20 h-20 border-2 cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    borderColor:
                      selectedImage ===
                      `https://nftstorage.link/ipfs/${onephygital?.image?.slice(
                        7
                      )}`
                        ? "#00DDEB"
                        : "transparent",
                  }}
                >
                  <img
                    src={`https://nftstorage.link/ipfs/${onephygital?.image?.slice(
                      7
                    )}`}
                    className="w-full h-full object-cover"
                    onClick={() =>
                      setSelectedImage(
                        `https://nftstorage.link/ipfs/${onephygital?.image?.slice(
                          7
                        )}`
                      )
                    }
                  />
                </div>
              </div>

              {/* Lightbox */}
              {showLightbox && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                  onClick={() => setShowLightbox(false)}
                >
                  <div className="relative max-w-[90vw] max-h-[90vh]">
                    <button
                      className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 w-10 h-10 rounded-full"
                      onClick={() => setShowLightbox(false)}
                    >
                      ×
                    </button>
                    <img
                      src={selectedImage}
                      className="max-w-full max-h-[90vh] object-contain"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              )}
            </div>
            {showProvenance && (
              <div
                className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center"
                style={{
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  WebkitBoxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  MozBoxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <div className="z-10 md:w-[60%] w-[100%] top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 h-[85%] overflow-y-scroll">
                  <ProvenanceAttestation
                    phygital={onephygital}
                    avatarModel={avatar && avatarUrl}
                    showAttestation={() => setShowProvenance(false)}
                  />
                </div>
              </div>
            )}
            <div className="w-full lg:w-2/3 border border-gray-300 p-4 lg:p-12 h-auto lg:h-[70vh]">
              <div className="text-2xl lg:text-4xl font-bold">
                {onephygital?.name}
              </div>
              <div className="text-lg mt-4 lg:mt-10 font-bold">
                Base Network
              </div>
              <div className="mt-4 text-sm truncate md:text-lg md:truncate lg:whitespace-normal">
                Owned by {onephygital?.deployer_address?.toString()}
              </div>
              <div className="mt-4">
                <div>
                  Created by{" "}
                  <span
                    className="font-bold cursor-pointer relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {onephygital?.brand_name?.toString()}
                    {isHovered && (
                      <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white p-4 rounded-lg shadow-lg z-20 w-[200px] lg:w-[300px]"
                      >
                        <div className="flex gap-4">
                          <img
                            src={`https://nftstorage.link/ipfs/${logos?.slice(
                              7
                            )}`}
                            className="w-16 lg:w-20 h-16 lg:h-20 rounded-full"
                          />
                          <div className="font-bold">
                            {onephygital?.brand_name?.toString()}
                          </div>
                        </div>
                        <div className="mt-4 text-sm lg:text-base">
                          {brandDesc?.toString()}
                        </div>
                        <Link
                          href={`/brand/${name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="mt-4 text-sm border border-white rounded-full px-4 py-1 inline-block"
                        >
                          View brand page
                        </Link>
                      </div>
                    )}
                  </span>
                </div>
              </div>

              {/* Conditional Rendering */}
              {!onephygital?.product_url ? (
                <>
                  <div className="mt-8 lg:mt-10 text-xl lg:text-2xl font-bold">
                    Price Amount
                  </div>
                  <div className="mt-6 lg:mt-10 flex justify-between">
                    <div className="text-xl lg:text-2xl font-bold">
                      {onephygital?.price?.toString()} ETH
                    </div>
                    <div>{priceUSD} USD</div>
                    <div>Phygital & Unique avatar</div>
                  </div>

                  <div className="text-lg mt-2 lg:mt-4 text-pink-600">
                    {sold}/{onephygital?.quantity?.toString()} Sold
                  </div>

                  <div className="mt-4 lg:mt-0 flex flex-col lg:flex-row gap-4">
                    <button className="w-full lg:w-1/3 bg-cyan-400 py-2 text-center hidden md:block">
                      PUT TO MARKET
                    </button>
                    <button
                      className="w-full lg:w-1/2 border-2 border-black py-2 text-center relative"
                      onClick={handleShare}
                    >
                      SHARE
                      {showShareOptions && (
                        <div
                          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-48"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ul className="flex flex-col">
                            <li
                              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                              onClick={() => {
                                const url = window.location.href;
                                const text = `Check this out🤩\nCoolest Phygital on Discover | Myriadflow✨\n\n${url}\n\n#Myriadflow #Discover #Phygitals #NFTs #Collections\n`;
                                shareOnTwitter(url, text);
                                setShowShareOptions(false);
                              }}
                            >
                              <FaTwitter className="text-[#1DA1F2]" />
                              <span>Twitter</span>
                            </li>
                            <li
                              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                              onClick={copyInstagramContent}
                            >
                              <FaInstagram className="text-[#E4405F]" />
                              <span>Instagram</span>
                            </li>
                            <li
                              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                              onClick={() => {
                                copyToClipboard(window.location.href);
                                setShowShareOptions(false);
                              }}
                            >
                              <FaCopy className="text-gray-600" />
                              <span>Copy Link</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </button>
                    <button
                      className="w-full lg:w-1/2 flex items-center justify-center border-2 border-[rgba(223, 31, 221, 1)] py-2"
                      onClick={togglePopup}
                    >
                      CERTIFICATE
                      <img src="/certificate.png" className="h-8 w-8 ml-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-8 lg:mt-10 flex flex-col lg:flex-row justify-end gap-4 lg:gap-20">
                    <div className="hidden lg:block w-1/2"></div>
                    <button className="w-full lg:w-1/2 border-2 border-black py-2 text-center">
                      SHARE
                    </button>
                  </div>

                  <div className="mt-6 lg:mt-10 flex flex-col lg:flex-row gap-4 lg:gap-20">
                    <button
                      className="w-full lg:w-1/2 bg-cyan-400 py-2 text-center relative"
                      onClick={handleClaimClick}
                    >
                      CLAIM NOW
                      {showPopover && (
                        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-black p-4 rounded-lg border border-black z-10">
                          To claim this phygital, scan the NFC tag on your
                          product
                        </div>
                      )}
                    </button>
                    <Link
                      href={`${onephygital?.product_url}`}
                      target="_blank"
                      className="w-full lg:w-1/2 flex items-center justify-center border-2 border-black py-2"
                    >
                      VIEW ON SHOPIFY
                      <img src="/shopify.png" className="w-8 h-8 ml-2" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 mt-4 lg:mt-10 px-4 lg:px-10 mb-10">
            <div className="w-full lg:w-1/3">
              <div className="border border-gray-300 p-4">
                <div className="text-2xl lg:text-4xl font-bold">
                  Description
                </div>
                <div className="mt-4 lg:mt-10">
                  {onephygital?.description?.toString()}
                </div>
              </div>
              <div className="mt-4 border border-gray-300 p-4">
                <div className="text-xl lg:text-2xl font-bold">NFT Details</div>
                <div className="mt-4 lg:mt-10 space-y-2 lg:space-y-4">
                  <div className="flex justify-between">
                    <div>Contract Address</div>
                    <div className="text-sm truncate lg:text-lg">
                      {onephygital?.contract_address?.toString()}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>Token ID</div>
                    <div>Token ID</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Token Standard</div>
                    <div>ERC-721A</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Chain</div>
                    <div>Base Network</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Date Created</div>
                    <div>{formatDate(onephygital?.created_at)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Last Sale</div>
                    <div>sale date</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Last Updated</div>
                    <div>{formatDate(onephygital?.updated_at)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Creator Earnings</div>
                    <div>{onephygital?.royality} %</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3 border border-gray-300 p-4 lg:p-12">
              <div className="text-4xl font-bold">WebXR</div>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-1/2">
                  <Link
                    href={`https://webxr.myriadflow.com/${onephygital?.name
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    target="_blank"
                    className="rounded"
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
                      color: "black", // Adjust text color to match your design
                      cursor: "pointer",
                      fontSize: "1.1rem",
                      width: "250px",
                      height: "50px", // Set fixed width for the button
                      display: "block",
                      marginTop: "40px", // Center the button
                      display: "flex", // Use Flexbox
                      alignItems: "center", // Center vertically
                      justifyContent: "center", // Center horizontally
                    }}
                  >
                    Experience
                  </Link>
                  <div className="mt-10 text-center md:text-left">
                    Access the WebXR experience to ask questions about the
                    brand, the product, and more!
                  </div>
                </div>
                <div className="my-10 md:my-0 flex flex-col items-center">
                  <div className="text-center text-2xl">Avatar</div>
                  {avatarUrl && (
                    <div className="w-48">
                      <Avatar
                        modelSrc={avatarUrl}
                        cameraInitialDistance={1.2}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xl lg:text-2xl font-bold mt-20">
                Additional Product details
              </div>
              <div className="mt-6 lg:mt-10 space-y-4 lg:space-y-6">
                <div className="flex justify-between gap-6">
                  <div>Material</div>
                  <div className="">{onephygital?.material?.toString()}</div>
                </div>
                <div className="flex justify-between gap-6">
                  <div>Usage</div>
                  <div className="text-gray-900">
                    {onephygital?.usage?.toString()}
                  </div>
                </div>

                <div className="flex justify-between gap-6">
                  <div>Unique Qualities</div>
                  <div>{onephygital?.quality?.toString()}</div>
                </div>
                <div className="flex justify-between gap-6">
                  <div>Weight</div>
                  <div>{onephygital?.weight?.toString()}</div>
                </div>
                <div className="flex justify-between gap-6">
                  <div>Manufacturer</div>
                  <div>{onephygital?.manufacturer?.toString()}</div>
                </div>
                <div className="flex justify-between gap-6">
                  <div>Made In</div>
                  <div>{onephygital?.origin_country?.toString()}</div>
                </div>
                <div className="flex justify-between gap-6">
                  <div>Size</div>
                  <div>{onephygital?.size?.toString()}</div>
                </div>
                <div className="flex justify-between gap-6">
                  <div>Color</div>
                  <div>{onephygital?.color?.toString()}</div>
                </div>
              </div>
            </div>
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
              <div
                style={{
                  position: "relative",
                  padding: "1rem",
                  width: "100%",
                  maxHeight: "100%",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: "0.5rem",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      src="https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif"
                      alt="Loading icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <Footer />
        </div>
      ) : (
        <div>
          <Head>
            <title>Discover | MyriadFlow</title>
            <meta
              name="description"
              content="Own the future of collecting! MyriadFlow Discover lets you buy, sell, and showcase unique phygital NFTs. Explore immersive VR experiences that bring your digital collectibles to life."
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content={`https://discover.myriadflow.com/nfts/${onephygital?.id}`}
            />
            <meta property="og:title" content="Discover | MyriadFlow" />
            <meta
              property="og:description"
              content="Own the future of collecting! MyriadFlow Discover lets you buy, sell, and showcase unique phygital NFTs. Explore immersive VR experiences that bring your digital collectibles to life."
            />
            <meta
              property="og:image"
              content={`https://nftstorage.link/ipfs/${onephygital?.image?.slice(
                7
              )}`}
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@MyriadFlow" />
            <meta name="twitter:title" content="Discover | MyriadFlow" />
            <meta
              name="twitter:description"
              content="Own the future of collecting! MyriadFlow Discover lets you buy, sell, and showcase unique phygital NFTs. Explore immersive VR experiences that bring your digital collectibles to life."
            />
            <meta
              name="twitter:image"
              content={`https://nftstorage.link/ipfs/${onephygital?.image?.slice(
                7
              )}`}
            />
          </Head>
          <Header1 />
          <ToastContainer />
          <div className="flex flex-col lg:flex-row gap-10 mt-24 px-4 lg:px-10">
            <div className="w-full lg:w-1/3">
              <div className="flex justify-center">
                <img
                  src={`https://nftstorage.link/ipfs/${onephygital?.image?.slice(
                    7
                  )}`}
                  className="w-full h-auto max-w-[70vh] max-h-[70vh] object-cover cursor-pointer"
                  onClick={() => setShowLightbox(true)}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-2 mt-4">
                <div
                  className="w-20 h-20 border-2 cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    borderColor:
                      selectedImage ===
                      `https://nftstorage.link/ipfs/${onephygital?.image?.slice(
                        7
                      )}`
                        ? "#00DDEB"
                        : "transparent",
                  }}
                >
                  <img
                    src={`https://nftstorage.link/ipfs/${onephygital?.image?.slice(
                      7
                    )}`}
                    className="w-full h-full object-cover"
                    onClick={() =>
                      setSelectedImage(
                        `https://nftstorage.link/ipfs/${onephygital?.image?.slice(
                          7
                        )}`
                      )
                    }
                  />
                </div>
              </div>

              {/* Lightbox */}
              {showLightbox && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                  onClick={() => setShowLightbox(false)}
                >
                  <div className="relative max-w-[90vw] max-h-[90vh]">
                    <button
                      className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 w-10 h-10 rounded-full"
                      onClick={() => setShowLightbox(false)}
                    >
                      ×
                    </button>
                    <img
                      src={selectedImage}
                      className="max-w-full max-h-[90vh] object-contain"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="w-full lg:w-2/3 border border-gray-300 p-4 lg:p-12 h-auto lg:h-[70vh]">
              <div className="text-2xl lg:text-4xl font-bold">
                {onephygital?.name}
              </div>
              <div className="text-lg mt-4 lg:mt-10 font-bold">
                Base Network
              </div>
              <div className="mt-4 text-sm truncate md:text-lg md:truncate lg:whitespace-normal">
                Owned by {onephygital?.deployer_address?.toString()}
              </div>
              <div className="mt-4">
                <div>
                  Created by{" "}
                  <span
                    className="font-bold cursor-pointer relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {onephygital?.brand_name?.toString()}
                    {isHovered && (
                      <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white p-4 rounded-lg shadow-lg z-20 w-[200px] lg:w-[300px]"
                      >
                        <div className="flex gap-4">
                          <img
                            src={`https://nftstorage.link/ipfs/${logos?.slice(
                              7
                            )}`}
                            className="w-16 lg:w-20 h-16 lg:h-20 rounded-full"
                          />
                          <div className="font-bold">
                            {onephygital?.brand_name?.toString()}
                          </div>
                        </div>
                        <div className="mt-4 text-sm lg:text-base">
                          {brandDesc?.toString()}
                        </div>
                        <Link
                          href={`/brand/${name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="mt-4 text-sm border border-white rounded-full px-4 py-1 inline-block"
                        >
                          View brand page
                        </Link>
                      </div>
                    )}
                  </span>
                </div>
              </div>

              {/* Conditional Rendering */}
              {!onephygital?.product_url ? (
                <>
                  <div className="mt-8 lg:mt-10 text-xl lg:text-2xl font-bold">
                    Price Amount
                  </div>
                  <div className="mt-6 lg:mt-10 flex justify-between">
                    <div className="text-xl lg:text-2xl font-bold">
                      {onephygital?.price?.toString()} ETH
                    </div>
                    <div>{priceUSD} USD</div>
                    <div>Phygital & Unique avatar</div>
                  </div>

                  <div className="text-lg mt-2 lg:mt-4 text-pink-600">
                    {sold}/{onephygital?.quantity?.toString()} Sold
                  </div>

                  <div className="mt-4 lg:mt-0 flex flex-col lg:flex-row gap-4">
                    <button
                      className="w-full lg:w-1/2 bg-cyan-400 py-2 text-center hidden md:block"
                      onClick={buyasset}
                    >
                      BUY NOW
                    </button>
                    <button
                      className="w-full lg:w-1/2 border-2 border-black py-2 text-center relative"
                      onClick={handleShare}
                    >
                      SHARE
                      {showShareOptions && (
                        <div
                          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-48"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ul className="flex flex-col">
                            <li
                              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                              onClick={() => {
                                const url = window.location.href;
                                const text = `Check this out🤩\nCoolest Phygital on Discover | Myriadflow✨\n\n${url}\n\n#Myriadflow #Discover #Phygitals #NFTs #Collections\n`;
                                shareOnTwitter(url, text);
                                setShowShareOptions(false);
                              }}
                            >
                              <FaTwitter className="text-[#1DA1F2]" />
                              <span>Twitter</span>
                            </li>
                            <li
                              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                              onClick={copyInstagramContent}
                            >
                              <FaInstagram className="text-[#E4405F]" />
                              <span>Instagram</span>
                            </li>
                            <li
                              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                              onClick={() => {
                                copyToClipboard(window.location.href);
                                setShowShareOptions(false);
                              }}
                            >
                              <FaCopy className="text-gray-600" />
                              <span>Copy Link</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </button>
                    <button
                      className="w-full lg:w-1/2 flex items-center justify-center border-2 border-black py-2"
                      onClick={handleAddToCart}
                    >
                      MOVE TO CART
                      <img src="/cart.png" className="h-8 w-8 ml-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-8 lg:mt-10 flex flex-col lg:flex-row justify-end gap-4 lg:gap-20">
                    <div className="hidden lg:block w-1/2"></div>
                    <button className="w-full lg:w-1/2 border-2 border-black py-2 text-center">
                      SHARE
                    </button>
                  </div>

                  <div className="mt-6 lg:mt-10 flex flex-col lg:flex-row gap-4 lg:gap-20">
                    <button
                      className="w-full lg:w-1/2 bg-cyan-400 py-2 text-center relative"
                      onClick={handleClaimClick}
                    >
                      CLAIM NOW
                      {showPopover && (
                        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-black p-4 rounded-lg border border-black z-10">
                          To claim this phygital, scan the NFC tag on your
                          product
                        </div>
                      )}
                    </button>
                    <Link
                      href={`${onephygital?.product_url}`}
                      target="_blank"
                      className="w-full lg:w-1/2 flex items-center justify-center border-2 border-black py-2"
                    >
                      VIEW ON SHOPIFY
                      <img src="/shopify.png" className="w-8 h-8 ml-2" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 mt-4 lg:mt-10 px-4 lg:px-10 mb-10">
            <div className="w-full lg:w-1/3">
              <div className="border border-gray-300 p-4">
                <div className="text-2xl lg:text-4xl font-bold">
                  Description
                </div>
                <div className="mt-4 lg:mt-10">
                  {onephygital?.description?.toString()}
                </div>
              </div>
              <div className="mt-4 border border-gray-300 p-4">
                <div className="text-xl lg:text-2xl font-bold">NFT Details</div>
                <div className="mt-4 lg:mt-10 space-y-2 lg:space-y-4">
                  <div className="flex justify-between">
                    <div>Contract Address</div>
                    <div className="text-sm truncate lg:text-lg">
                      {onephygital?.contract_address?.toString()}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>Token ID</div>
                    <div>Token ID</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Token Standard</div>
                    <div>ERC-721A</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Chain</div>
                    <div>Base Network</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Date Created</div>
                    <div>{formatDate(onephygital?.created_at)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Last Sale</div>
                    <div>sale date</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Last Updated</div>
                    <div>{formatDate(onephygital?.updated_at)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Creator Earnings</div>
                    <div>{onephygital?.royality} %</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3 border border-gray-300 p-4 lg:p-12">
              <div className="text-4xl font-bold">WebXR</div>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-1/2">
                  <Link
                    href={`https://webxr.myriadflow.com/${onephygital?.name
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    target="_blank"
                    className="rounded"
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
                      color: "black", // Adjust text color to match your design
                      cursor: "pointer",
                      fontSize: "1.1rem",
                      width: "250px",
                      height: "50px", // Set fixed width for the button
                      display: "block",
                      marginTop: "40px", // Center the button
                      display: "flex", // Use Flexbox
                      alignItems: "center", // Center vertically
                      justifyContent: "center", // Center horizontally
                    }}
                  >
                    Experience
                  </Link>
                  <div className="mt-10 text-center md:text-left">
                    Access the WebXR experience to ask questions about the
                    brand, the product, and more!
                  </div>
                </div>
                <div className="my-10 md:my-0 flex flex-col items-center">
                  <div className="text-center text-2xl">Avatar</div>
                  {avatarUrl && (
                    <div className="w-48">
                      <Avatar
                        modelSrc={avatarUrl}
                        cameraInitialDistance={1.2}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xl lg:text-2xl font-bold mt-20">
                Additional Product details
              </div>
              <div className="mt-6 lg:mt-10 space-y-4 lg:space-y-6">
                <div className="flex justify-between gap-6">
                  <div>Material</div>
                  <div className="">{onephygital?.material?.toString()}</div>
                </div>
                <div className="flex justify-between gap-6">
                  <div>Usage</div>
                  <div className="text-gray-900">
                    {onephygital?.usage?.toString()}
                  </div>
                </div>

                <div className="flex justify-between gap-6">
                  <div>Unique Qualities</div>
                  <div>{onephygital?.quality?.toString()}</div>
                </div>
                <div className="flex justify-between gap-6">
                  <div>Weight</div>
                  <div>{onephygital?.weight?.toString()}</div>
                </div>
                <div className="flex justify-between gap-6">
                  <div>Manufacturer</div>
                  <div>{onephygital?.manufacturer?.toString()}</div>
                </div>
                <div className="flex justify-between gap-6">
                  <div>Made In</div>
                  <div>{onephygital?.origin_country?.toString()}</div>
                </div>
                <div className="flex justify-between gap-6">
                  <div>Size</div>
                  <div>{onephygital?.size?.toString()}</div>
                </div>
                <div className="flex justify-between gap-6">
                  <div>Color</div>
                  <div>{onephygital?.color?.toString()}</div>
                </div>
              </div>
            </div>
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
              <div
                style={{
                  position: "relative",
                  padding: "1rem",
                  width: "100%",
                  maxHeight: "100%",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: "0.5rem",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      src="https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif"
                      alt="Loading icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default NFTPage;
