import React from "react";
import MostRecentlyCard from "./mostRecentlyCard";

const mostRecently = ({collectionsdata}) => {
  return (
    <div>
      <div className="font-semibold" style={{ color: "#DF1FDD" }}>
        Most Recently Launched
      </div>
      <div className="font-bold text-black text-6xl mt-10">
      New on Discover
      </div>
      <div className="flex justify-between text-2xl" style={{justifyContent: 'space-between'}}>
        <div className="mt-4">
        New Frontier: Be Among the First to Discover the Newest NFTs Making Their Debut!
        </div>
        <button className="border py-3 px-10">View All</button>
      </div>

      <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap', justifyContent:'center' }}>
        {collectionsdata?.map((nft, index) => (
          <MostRecentlyCard key={index} nft={nft} />
        ))}
      </div>
      
    </div>
  );
};

export default mostRecently;
