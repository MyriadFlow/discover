import React from 'react';
import Link from 'next/link';

const mostLovedCard = () => {
  return (
    <Link href="/nfts/123">
        <div
          style={{
            width: "330px",
            borderRadius: "30px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            src="./slider3 metallic suit small 2.png"
            className="rounded"
            style={{ padding: "20px" }}
          />
          <div
            className="flex justify-between"
            style={{ paddingLeft: "20px", paddingRight: "20px" , justifyContent: 'space-between'}}
          >
            <div className="font-bold text-lg">Metallic Suit</div>
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
              <div className="text-xl">0.89 ETH</div>
              <div>195 USD</div>
            </div>
            <div
              className="px-10 text-lg"
              style={{
                backgroundColor: "#DF1FDD36",
                border: "1px solid black",
                height: "30px",
              }}
            >
              Mint
            </div>
          </div>
        </div>
    </Link>
  )
}

export default mostLovedCard;