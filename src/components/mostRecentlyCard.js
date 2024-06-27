import React from 'react';

const MostRecentlyCard = ({ nft }) => {
  return (
    <div>
      <div
        style={{
          width: "330px",
          borderRadius: "30px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
              src={`${
                "https://nftstorage.link/ipfs"
              }/${nft?.cover_image.slice(7)}`}
            className="rounded"
            style={{ padding: "20px", borderRadius: '30px' }}
            alt="Gold Headphones"
          />
          {/* New Image and Text at the top ends */}
          <img
            src="./Concrete.png"
            alt="New Icon"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              width: "50px",
              height: "50px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "5px 20px",
              borderRadius: "10px",
              border: '1px solid black',
              background:'white'
            }}
          >
            Web XR
          </div>
        </div>
        <div
          className="flex justify-between"
          style={{ paddingLeft: "20px", paddingRight: "20px", justifyContent: 'space-between' }}
        >
          <div className="font-bold text-lg">{nft?.phygitalName}</div>
          <div>...</div>
        </div>
        <div
          className="flex justify-between"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "20px",
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div className="text-xl">{nft?.price} ETH</div>
            <div>195 USD</div>
          </div>
          <div
            className="px-10 text-lg"
            style={{
              backgroundColor: "#DF1FDD36",
              border: "1px solid black",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
            }}
          >
            Buy
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostRecentlyCard;
