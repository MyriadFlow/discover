import React from "react";
import MostLovedCard from "./mostLovedCard";
import Link from "next/link";

const mostLoved = ({collectionsdata}) => {
  return (
    <div>
      <div className="font-semibold" style={{ color: "#DF1FDD" }}>
        Most Loved Right Now
      </div>
      <div className="font-bold text-black text-6xl mt-10">
        Trending Collections
      </div>
      <div className="flex justify-between text-2xl" style={{justifyContent: 'space-between'}}>
        <div className="mt-4">
          Must-Have Mints: Don&apos;t Miss Out on These Top-Selling Phygitals Before
          They&apos;re Gone!
        </div>
        <Link href="/allcollections" className="border"
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
          display: "block",
          width: "180px",
          height: "50px",
          textAlign:'center',
        }}
        >
          <div style={{marginTop: '4px'}}>View All</div></Link>
      </div>

      <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap', justifyContent:'center' }}>
        {collectionsdata?.slice(-8).map((nft, index) => (
          <MostLovedCard key={index} nft={nft} />
        ))}
      </div>
      
    </div>
  );
};

export default mostLoved;
