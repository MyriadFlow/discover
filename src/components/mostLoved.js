import React from "react";
import MostLovedCard from "./mostLovedCard";

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
        <button className="border py-3 px-10">View All</button>
      </div>

      <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap', justifyContent:'center' }}>
        {collectionsdata?.map((nft, index) => (
          <MostLovedCard key={index} nft={nft} />
        ))}
      </div>
      
    </div>
  );
};

export default mostLoved;
