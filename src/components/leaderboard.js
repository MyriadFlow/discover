import React from "react";

const leaderboard = () => {
  return (
    <div>
      <div className="font-bold text-black text-6xl px-10">
        Avatar Leaderboard{" "}
      </div>
      <div className="flex justify-between text-2xl px-10" style={{justifyContent: 'space-between'}}>
        <div className="mt-4">
          This Week&apos;s Top performing AI-Powered Brand Ambassadors
        </div>
        <button className="border py-3 px-10">View All</button>
      </div>

      <div
        style={{
          backgroundColor: "#00000021",
          position: 'relative',
          marginTop:'100px'
        }}
      >

        {/* Left Image */}
      <img
        src='/trophy1.png'
        alt="Left"
        style={{
          position: 'absolute',
          top: '0',
          left: '50px',
          transform: 'translateY(-50%)',
          width: '150px', // Adjust as needed
          height: '150px', // Adjust as needed
        }}
      />

      {/* Right Image */}
      <img
        src='/trophy2.png'
        alt="Right"
        style={{
          position: 'absolute',
          top: '0',
          right: '50px',
          transform: 'translateY(-50%)',
          width: '150px', // Adjust as needed
          height: '150px', // Adjust as needed
        }}
      />


        <div
          className="text-center text-2xl font-bold"
          style={{
            background:
              "linear-gradient(to right, #F45EC1 , #F45EC1 , #4EB9F3, #4EB9F3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundColor: "#00000021",
            paddingTop:'20px',
            paddingBottom:'20px',
            textAlign: 'center',
          }}
        >
          Rewarding Creators, Owners and Supporters.
        </div>
      </div>
    </div>
  );
};

export default leaderboard;
