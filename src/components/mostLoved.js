import React from "react";
import MostLovedCard from "./mostLovedCard";

const mostLoved = () => {
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
          Must-Have Mints: Don&apos;t Miss Out on These Top-Selling NFTs Before
          They&apos;re Gone!
        </div>
        <button className="border py-3 px-10">View All</button>
      </div>

      <div className="mt-10 flex" style={{gap:'40px'}}>
        <MostLovedCard />
        <MostLovedCard />
        <MostLovedCard />
        <MostLovedCard />
      </div>

      <div className="mt-10 flex" style={{gap:'40px'}}>
        <MostLovedCard />
        <MostLovedCard />
        <MostLovedCard />
        <MostLovedCard />
      </div>
      
    </div>
  );
};

export default mostLoved;
