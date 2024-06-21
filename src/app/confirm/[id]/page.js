"use client"
import React, {useState} from "react";
import Link from "next/link";

const ConfirmAddr = ({ params }) => {
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
      <div className="mt-10 px-10">
        
        <div
          style={{
            paddingLeft: "50px",
            paddingRight: "50px",
            paddingTop: "20px",
          }}
          className=""
        >
          <div className="text-6xl font-bold" 
          style={{backgroundImage: "linear-gradient(90deg, #30D8FF, #5B0292, #5B0292, #5B0292)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          paddingBottom: "10px"}}>Congratulations!</div>
          <div className="text-2xl mt-10">You have successfully minted phygital name phygital NFT!</div>



          {/* --------------------------------------- user perspective --------------------------------------------------------- */}

          <div className="mt-10 text-2xl font-bold">IMPORTANT!</div>

          <div className="mt-10" style={{fontSize:'20px'}}>Fill in your address, so brand name can ship your product.</div>
          <div
            className="mt-10"
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <div style={{ fontSize:'22px', fontWeight:'bold' }}>Shipping address:</div>
          </div>

          <div
            className="mt-4"
          >
            <input
      type="text"
      style={{
        backgroundColor: '#0000001A',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '40%', // Adjust as needed
        color: '#000', // Text color
        fontSize: '16px'
      }}
      placeholder="Your address"
    />
          </div>

          <div className="mt-10" style={{ display: "flex", gap: "20px" }}>
            <Link href={`/confirm/${id}`}
              className="justify-center flex"
              style={{
                backgroundColor: "#30D8FF",
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "30px",
                paddingRight: "30px",
                borderRadius:'15px',
                fontSize: '20px'
              }}
            >
              Confirm address
            </Link>
          </div>


        </div>
      </div>

    
    </div>
  );
};

export default ConfirmAddr;
