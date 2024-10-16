import React from 'react';

const CreateBanner = () => {
  return (
    <div
      className="relative w-full"
      style={{
        // backgroundColor: 'rgba(244, 0, 171, 0.5)',
        backgroundImage: "url('./createbanner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh",
      }}
    >
      <img
        src="./web.png"
        alt="Right Mid"
        style={{
          position: "absolute",
          top: "50%",
          right: "150px",
          transform: "translateY(-50%)",
          width: "400px",
          height: "400px",
        }}
      />

      <div
        className="absolute flex flex-col"
        style={{
          top: "50%",
          left: "25%",
          transform: "translate(-50%, -50%)",
          // textAlign: "center",
          color: "black",
        }}
      >
        <h1 className="text-7xl">Create Your Own?</h1>
        <h1 className='text-2xl mt-8'>Launch phygitals & virtual experiences for your Brand.
          <br /> No coding knowledge needed.</h1>
        <a
          href="https://studio.myriadflow.com"
          target="_blank" // Open in a new tab
          rel="noopener noreferrer" // Security best practice
        >
          <button
            className="rounded mt-8"
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
              width: "150px",
              height: '50px', // Set fixed width for the button
              display: "block",
            }}
          >
            Get Started
            <img
              src={'arrow.png'}
              alt='Arrow'
              className='inline-block ml-2 -mt-1'
              style={{ width: '12px', height: '12px' }}
            />
          </button>
        </a>
      </div>
    </div>
  );
}

export default CreateBanner;
