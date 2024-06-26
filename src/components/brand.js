import React from "react";

const brand = ({brandsdata}) => {

  // const recentBrands = brandsdata.slice(-3).reverse();

  console.log("brands", brandsdata)

  return (
    <div>
      <div className="font-bold text-black text-6xl">
      Brand Champions{" "}
      </div>
      <div
        className="flex justify-between text-2xl"
        style={{ justifyContent: "space-between" }}
      >
        <div className="mt-4">
        Pushing the Boundaries of Innovation.
        </div>
        <button className="border py-3 px-10">View All</button>
      </div>

      <div className="flex text-2xl" style={{justifyContent: 'center', marginTop:'200px', paddingBottom:'200px',gap:'20px', flexWrap: 'wrap'}}>
      {brandsdata?.map((brand, index) => (
          <div key={index} className="flex flex-col justify-center items-center">
            <img
              src={`${
                "https://nftstorage.link/ipfs"
              }/${brand.logo_image.slice(7)}`}
              alt={brand.name}
              style={{
                width: "250px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              {brand.name}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default brand;
