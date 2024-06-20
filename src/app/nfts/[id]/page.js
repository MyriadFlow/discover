"use client"
import React, {useState} from "react";


const NFTPage = ({ params }) => {
  const id = params?.id;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <div className="px-10" style={{display:'flex', justifyContent: 'space-between', background: 'linear-gradient(90deg, #DF1FDD8A, #30D8FFAB, #5347E7AB)', paddingBottom: '10px'}}>
        <div
          className='mt-4'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ position: 'relative' }}
        >
          <img src="../logo2.png" style={{ width: '200px' }} alt="Logo" />

          {/* Pop-up Div */}
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                top: '110%', // Adjust position based on your design
                left: '80%',
                transform: 'translateX(-50%)',
                backgroundColor: '#D9D8D8',
                color: 'black',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '15px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 20,
                width: '300px',
                // textAlign: 'center'
              }}
            >
            <div style={{display: 'flex', gap:'20px'}}>
                <img src="../slider3 metallic suit small 2.png" style={{width: '80px', borderRadius:'100px'}}/>
              <div className="font-bold mt-6">Brand Name</div>
              </div>
              <div className="mt-4" style={{fontSize: '13px'}}>Brand Description here. Brand Description here. Brand Description here. Brand Description here. Brand Description here. Brand Description here.</div>
            </div>
          )}
        </div>
        <div style={{display:'flex', gap:'40px', fontSize:'20px', color:'white'}} className="font-bold mt-6">
<div>Explore</div>
<div>Collections</div>
<div>Brand</div>
<div>Dashboard</div>
        </div>
        <div>
            <button className="px-10 mt-6" style={{color: "white", paddingTop:'5px', paddingBottom:'5px', borderRadius:'50px', backgroundImage: 'url("../Rectangle 12.png")'}}>Connect</button>
        </div>
    </div>
      <div className="flex gap-10 mt-10 px-10">
        <div className="w-1/3">
          <img
            src="../slider3 metallic suit small 2.png"
            style={{ width: "70vh", height: "70vh" }}
          />
        </div>
        <div
          style={{
            border: "1px solid #0000004D",
            paddingLeft: "50px",
            paddingRight: "50px",
            paddingTop: "50px",
            width: "120vh",
            height: "70vh",
          }}
          className="w-2/3"
        >
          <div className="text-4xl font-bold">Phygital Name</div>
          <div className="text-lg mt-10 font-bold">Base Network</div>
          <div className="mt-6">Owned by wallet address</div>
          <div className="mt-4">Created by brand name</div>
          <div className="mt-10 text-2xl font-bold">Price Amount</div>
          <div
            className="mt-10"
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <div className="text-2xl font-bold">price ETH</div>
            <div>current price USD</div>
            <div>Phygital & Unique avatar </div>
          </div>

          <div className="mt-10" style={{ display: "flex", gap: "20px" }}>
            <button
              className=""
              style={{
                backgroundColor: "#30D8FF",
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "70px",
                paddingRight: "70px",
              }}
            >
              MINT NOW
            </button>
            <button
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "70px",
                paddingRight: "70px",
                border: "2px solid black",
              }}
            >
              SHARE
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-10 mt-4 px-10" style={{ marginBottom: "30px" }}>
        <div className="w-1/3" style={{ width: "70vh" }}>
          <div
            style={{
              border: "1px solid #0000004D",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "30px",
              paddingBottom: "60px",
            }}
          >
            <div className="text-4xl font-bold">Description</div>
            <div className="mt-10">
              Phygital descrition here. Phygital descrition here. Phygital
              descrition here. Phygital descrition here. Phygital descrition
              here. Phygital descrition here.
            </div>
          </div>
          <div
            className="mt-4"
            style={{
              border: "1px solid #0000004D",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            <div className="text-2xl font-bold">NFT Details </div>
            <div
              style={{ justifyContent: "space-between", display: "flex" }}
              className="mt-10"
            >
              <div>Contact Address</div>
              <div>address</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Token ID</div>
              <div>Token ID</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Token Standard</div>
              <div>ERC-721A</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Chain</div>
              <div>Base Chain</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Date Created</div>
              <div>date</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Last Sale</div>
              <div>sale date</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Last Updated</div>
              <div>update date (avatar also)</div>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div>Creator Earnings</div>
              <div>Royalty %</div>
            </div>
          </div>
        </div>

        <div className="w-2/3" style={{ width: "120vh" }}>
          <div
            style={{
              border: "1px solid #0000004D",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "30px",
              paddingBottom: "60px",
            }}
          >
            <div className="text-4xl font-bold">WebXR</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="w-1/2">
                <button
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
                  }}
                >
                  Experience
                </button>
                <div className="mt-10">
                  Access the WebXR experience to ask questions about the brand,
                  the product, and more!{" "}
                </div>
              </div>
              <div style={{margin:'0 auto', display: "block"}}>
                <div className="text-center">Avatar Image</div>
                <img
                  src="../slider3 metallic suit small 2.png"
                  style={{ width: "200px", marginTop:'10px' }}
                />
              </div>
            </div>
          </div>
          <div
            className="mt-4"
            style={{
              border: "1px solid #0000004D",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            <div className="text-2xl font-bold">Additional Product details</div>
            <div style={{display:'flex', gap:'40px'}} className="mt-10">
<div>Color</div>
<div>Size</div>
<div>Weight</div>
<div>Material</div>
<div>Usage</div>
<div>Unique Qualities</div>
<div>Manufacturer</div>
<div>Made In</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
