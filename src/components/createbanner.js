import React from 'react'

const createbanner = () => {
  return (
    <div>
        <div
          className="w-1/2"
          style={{
            backgroundImage: 'url("/landing.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <img
            src="./image 4.png"
            alt="Top Left"
            style={{
              position: "absolute",
              top: "40px",
              left: "40px",
              width: "280px",
              height: "280px",
            }}
          />
          <img
            src="./image 6.png"
            alt="Top Right"
            style={{
              position: "absolute",
              top: "40px",
              right: "40px",
              width: "280px",
              height: "280px",
            }}
          />
          <img
            src="./image 8.png"
            alt="Bottom Left"
            style={{
              position: "absolute",
              bottom: "40px",
              left: "40px",
              width: "280px",
              height: "280px",
            }}
          />

          <img
            src="./image 7.png"
            alt="Overlay"
            style={{
              position: "absolute",
              bottom: "40px",
              left: "40px",
              width: "280px",
              height: "300px",
              marginBottom: "20px",
            }}
          />

          <img
            src="./image 5.png"
            alt="Bottom Right"
            style={{
              position: "absolute",
              bottom: "40px",
              right: "40px",
              width: "280px",
              height: "280px",
            }}
          />
        </div>
    </div>
  )
}

export default createbanner