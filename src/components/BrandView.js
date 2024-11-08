"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import MostLovedCard from "../mostLovedCard";
import HotNftCard from "../hotNftCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BrandView = ({ params, onEdit }) => {
  const brandName = params?.id
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const [brand, setBrand] = useState();
  const [collections, setcollections] = useState([]);
  const [nfts, setnfts] = useState([]);
  const [loading, setloading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { address: userAddress } = useAccount();

  useEffect(() => {
    const brandmatch = async () => {
      setloading(true);
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

        const phyres = await fetch(
          `${baseUri}/collections/all/554b4903-9a06-4031-98f4-48276c427f78`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const nfts = await fetch(
          `${baseUri}/phygitals/all/554b4903-9a06-4031-98f4-48276c427f78`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok || !phyres.ok || !nfts.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();
        const collections = await phyres.json();
        const phynfts = await nfts.json();

        const matchedBrand = result.find((brand) => brand.name === brandName);
        if (matchedBrand) {
          const isOwner =
            userAddress?.toLowerCase() ===
            matchedBrand?.payout_address?.toLowerCase();
          setIsOwner(isOwner);
          setBrand(matchedBrand);
          const brandId = matchedBrand.id;

          const matchedCollections = collections.filter(
            (collection) => collection.brand_id === brandId
          );

          const matchedCollectionIds = matchedCollections.map(
            (collection) => collection.id
          );

          const matchedNFTs = phynfts.filter((nft) =>
            matchedCollectionIds.includes(nft.collection_id)
          );

          setcollections(matchedCollections);
          setnfts(matchedNFTs);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load brand data");
      } finally {
        setloading(false);
      }
    };

    brandmatch();
  }, [brandName, userAddress]);

  return (
    <>
      <ToastContainer />
      <div
        style={{
          position: "relative",
          textAlign: "center",
          paddingTop: "90px",
        }}
      >
        <img
          src={`${"https://nftstorage.link/ipfs"}/${brand?.cover_image?.slice(
            7
          )}`}
          alt={brand?.name}
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            height: "90vh",
            width: "100vw",
            transform: "scale(1)",
            objectPosition: "center",
          }}
        />

        <img
          src={`${"https://nftstorage.link/ipfs"}/${brand?.logo_image?.slice(
            7
          )}`}
          alt={brand?.name}
          style={{
            width: "350px",
            borderRadius: "20px",
            position: "absolute",
            bottom: "20px",
            left: "20px",
          }}
        />
      </div>

      <div
        style={{ marginLeft: "40px", marginRight: "40px", marginTop: "100px" }}
      >
        <div className="flex items-start flex-justify">
          <div>
            <div className="font-bold text-black" style={{ fontSize: "40px" }}>
              {brand?.name}
            </div>
            <div className="mt-4 w-1/2">{brand?.description}</div>
          </div>
          <div>
            <div
              className="text-2xl flex gap-2"
              style={{ justifyContent: "space-between" }}
            >
              {isOwner && (
                <button
                  onClick={onEdit}
                  className="border"
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
                  <div style={{ marginTop: "4px" }}>EDIT BRAND</div>
                </button>
              )}
              <Link
                href=""
                className="border"
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
                <div style={{ marginTop: "4px" }}>SHARE</div>
              </Link>
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
              {/* Social Links */}
              {brand?.website && (
                <a
                  href={brand?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/website.png"
                    style={{ height: "30px", width: "30px" }}
                    alt="Website"
                  />
                </a>
              )}
              {/* Repeat for other social links */}
              {/* Twitter */}
              {brand?.twitter && (
                <a
                  href={brand?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/x.png"
                    style={{ height: "30px", width: "30px" }}
                    alt="Twitter"
                  />
                </a>
              )}
              {/* Add all other social media links similarly */}
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

      {loading && (
        <div
          style={{
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
    </>
  );
};

export default BrandView;
