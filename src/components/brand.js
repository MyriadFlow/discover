import React from "react";

const brand = ({brandsdata}) => {

  const recentBrands = brandsdata.slice(-3).reverse();

  return (
    <div>
      <div className="font-bold text-black text-6xl px-10">
      Brand Champions{" "}
      </div>
      <div
        className="flex justify-between text-2xl px-10"
        style={{ justifyContent: "space-between" }}
      >
        <div className="mt-4">
        Pushing the Boundaries of Innovation.
        </div>
        <button className="border py-3 px-10">View All</button>
      </div>

      <div className="flex px-10 text-2xl" style={{justifyContent: 'center', marginTop:'200px', paddingBottom:'200px'}}>
      
      {recentBrands.map((brand, index) => (
          <div key={index} className="flex flex-col justify-center items-center">
            <img
              src={brand.logoImage}
              alt={brand.brandName}
              style={{
                width: "60%",
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
              {brand.brandName}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default brand;
