"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";

import MostLovedCard from "@/components/mostLovedCard";
import HotNftCard from "@/components/hotNftCard";
import Header1 from "@/components/header1";
import Footer from "@/components/footer";
import { apiRequest } from "@/utils/api";
import LoaderAnimated from "@/components/ui/LoaderAnimated";
import Image from "next/image";

const Brand = ({ params }) => {
  const brandName = params?.id
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const [brand, setBrand] = useState();
  const [collections, setCollections] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { address: userAddress } = useAccount();

  useEffect(() => {
    const fetchBrandData = async () => {
      setLoading(true);

      try {
        const [brands, allCollections, allNfts] = await Promise.all([
          apiRequest("/brands/all/554b4903-9a06-4031-98f4-48276c427f78"),
          apiRequest("/collections/all/554b4903-9a06-4031-98f4-48276c427f78"),
          apiRequest("/phygitals/all/554b4903-9a06-4031-98f4-48276c427f78"),
        ]);

        const matchedBrand = brands.find((brand) => brand.name === brandName);
        console.log("matchedBrand", matchedBrand);
        if (matchedBrand) {
          setIsOwner(
            userAddress?.toLowerCase() ===
              matchedBrand?.payout_address?.toLowerCase()
          );
          setBrand(matchedBrand);

          const matchedCollections = allCollections.filter(
            (collection) => collection.brand_id === matchedBrand.id
          );

          const matchedNfts = allNfts.filter((nft) =>
            matchedCollections.map((col) => col.id).includes(nft.collection_id)
          );

          setCollections(matchedCollections);
          setNfts(matchedNfts);
        }
      } catch (error) {
        console.error("Error fetching brand data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [brandName, userAddress]);

  const handleShare = async () => {
    if (!brand) return;

    const imageUrl = `https://nftstorage.link/ipfs/${brand.cover_image?.slice(
      7
    )}`;
    const shareText = `${brand.name}\n\n${brand.description}\n\nView more at: ${window.location.href}`;

    try {
      await navigator.clipboard.writeText(shareText);
      toast.success("Brand details copied to clipboard!");
    } catch (error) {
      console.error("Error copying details:", error);
      toast.error("Failed to copy brand details");
    }
  };
  console.log("brand", brand);
  return (
    <>
      <div
        className=""
        style={{ zIndex: 10, position: "fixed", left: 0, right: 0 }}
      >
        <Header1 />
      </div>
      <div
        style={{
          position: "relative",
          textAlign: "center",
          paddingTop: "90px",
        }}
      >
        <img
          className="block mx-auto w-screen h-[90vh] object-cover object-center"
          src={`${"https://nftstorage.link/ipfs"}/${brand?.cover_image?.slice(
            7
          )}`}
          alt={brand?.name}
        />

        <img
          className="w-[350px] rounded-[20px] absolute bottom-[20px] left-[20px]"
          src={`${"https://nftstorage.link/ipfs"}/${brand?.logo_image?.slice(
            7
          )}`}
          alt={brand?.name}
          style={{
            width: "350px", // Adjust the width as needed
            borderRadius: "20px",
            position: "absolute",
            bottom: "20px", // Adjust the offset from the bottom as needed
            left: "20px", // Adjust the offset from the left as needed
          }}
        />
      </div>

      <div className="w-full" style={{ padding: "100px 100px" }}>
        <div className="flex items-start justify-between">
          <div className="w-full">
            <div className="font-bold text-black text-4xl">{brand?.name}</div>
            <div className="mt-4 w-1/2">{brand?.description}</div>
          </div>
          <div>
            <div className="text-2xl flex gap-2 justify-between">
              {isOwner && (
                <Link
                  href={`https://studio.myriadflow.com/edit-brand/${params.id}`}
                  className="bg-[#E6E6E6] border-none rounded-[30px] block w-[180px] h-[50px] text-center text-black font-normal"
                >
                  <div className="mt-1">Edit profile</div>
                </Link>
              )}
              <div
                onClick={handleShare}
                className="border cursor-pointer"
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
                  WebkitBackgroundClip: "content-box, border-box",
                  display: "block",
                  width: "180px",
                  height: "50px",
                  textAlign: "center",
                }}
              >
                <div className="mt-1">SHARE</div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                float: "right",
                maxWidth: "200px",
                marginTop: "30px",
                gap: "8px",
              }}
            >
              {brand?.website && (
                <a
                  href={brand?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/website.png"
                    alt="Website"
                    height={30}
                    width={30}
                  />
                </a>
              )}
              {brand?.twitter && (
                <a
                  href={brand?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/x.png" alt="Twitter" height={30} width={30} />
                </a>
              )}
              {brand?.instagram && (
                <a
                  href={brand?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/insta.png"
                    alt="Instagram"
                    height={30}
                    width={30}
                  />
                </a>
              )}
              {brand?.facebook && (
                <a
                  href={brand?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/facebook.png"
                    alt="Facebook"
                    height={30}
                    width={30}
                  />
                </a>
              )}
              {brand?.discord && (
                <a
                  href={brand?.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/discord.png"
                    alt="Discord"
                    height={30}
                    width={30}
                  />
                </a>
              )}
              {brand?.additional_link &&
                brand.additional_link === "whatsapp" && (
                  <a
                    href={brand?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/whatsapp.png"
                      alt="WhatsApp"
                      height={30}
                      width={30}
                    />
                  </a>
                )}
              {brand?.additional_link &&
                brand.additional_link === "youtube" && (
                  <a
                    href={brand?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/youtube.png"
                      alt="YouTube"
                      height={30}
                      width={30}
                    />
                  </a>
                )}
              {brand?.additional_link &&
                brand.additional_link === "telegram" && (
                  <a
                    href={brand?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/telegram.png"
                      alt="Telegram"
                      height={30}
                      width={30}
                    />
                  </a>
                )}
              {brand?.additional_link &&
                brand.additional_link === "linkedin" && (
                  <a
                    href={brand?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/linkedin.png"
                      alt="LinkedIn"
                      height={30}
                      width={30}
                    />
                  </a>
                )}
              {brand?.additional_link && brand.additional_link === "google" && (
                <a href={brand.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/google.png"
                    alt="Google"
                    height={30}
                    width={30}
                  />
                </a>
              )}
              {brand?.additional_link && brand.additional_link === "tiktok" && (
                <a href={brand.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/tiktok.png"
                    alt="TikTok"
                    height={30}
                    width={30}
                  />
                </a>
              )}
              {brand?.additional_link &&
                brand.additional_link === "snapchat" && (
                  <a
                    href={brand.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/snapchat.png"
                      alt="Snapchat Icon"
                      height={30}
                      width={30}
                    />
                  </a>
                )}
              {brand?.additional_link &&
                brand.additional_link === "pinterest" && (
                  <a
                    href={brand.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/pinterest.png"
                      alt="WhatsApp"
                      height={30}
                      width={30}
                    />
                  </a>
                )}
            </div>
          </div>
        </div>

        <div
          className="font-bold text-black text-4xl"
          style={{ marginTop: "100px" }}
        >
          Collections
        </div>

        <div className="mt-10 flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          {collections?.map((nft, index) => (
            <MostLovedCard key={index} nft={nft} />
          ))}
        </div>

        <div
          className="font-bold text-black text-4xl"
          style={{ marginTop: "100px" }}
        >
          Phygitals
        </div>

        <div className="mt-10 flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          {nfts?.map((nft, index) => (
            <HotNftCard key={index} nft={nft} />
          ))}
        </div>
      </div>

      <div className="pt-20">
        <Footer />
      </div>

      <LoaderAnimated loading={loading} />
    </>
  );
};

export default Brand;
