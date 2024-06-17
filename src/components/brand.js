import React from "react";

const brand = () => {
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

      <div className="flex px-10" style={{justifyContent: 'center', marginTop:'200px', marginBottom:'200px'}}>
        <div className="flex flex-col justify-center items-center">
          <img
            src="/image 7.png"
            style={{
              width: "60%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <div style={{ position: 'relative' }}>
          <img
            src="/silver.png"
            style={{
              width: "60%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <div style={{
          position: 'absolute', // Positioning the text absolutely within its container
          top: '35%',            // Aligning text to the center vertically
          left: '50%',           // Aligning text to the center horizontally
          transform: 'translate(-50%, -50%)', // Centering the text precisely
          textAlign: 'center',   // Centering text within its container
          fontSize: '24px',      // Font size
          fontWeight: 'bold',    // Font weight
        }}>
          SILVER
        </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            No. tokens
          </div>

          <button
            className="text-2xl text-center"
            style={{
              border: "2px solid black", // Adds a solid black border
              padding: "0.5rem 2.5rem", // Vertical padding: 8px, Horizontal padding: 40px
              borderRadius: "17px", // Fully rounded corners
              cursor: "pointer", // Pointer cursor on hover
              marginLeft: "auto", // Auto margin left
              marginRight: "auto", // Auto margin right
            }}
          >
            WebXR
          </button>
        </div>



        <div className="flex flex-col justify-center items-center" style={{marginTop:'-200px'}}>
          <img
            src="/f41.png"
            style={{
              width: "60%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <div style={{ position: 'relative' }}>
          <img
            src="/gold.png"
            style={{
              width: "60%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <div style={{
          position: 'absolute', // Positioning the text absolutely within its container
          top: '35%',            // Aligning text to the center vertically
          left: '50%',           // Aligning text to the center horizontally
          transform: 'translate(-50%, -50%)', // Centering the text precisely
          textAlign: 'center',   // Centering text within its container
          fontSize: '24px',      // Font size
          fontWeight: 'bold',    // Font weight
        }}>
          GOLD
        </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            No. tokens
          </div>

          <button
            className="text-2xl text-center"
            style={{
              border: "2px solid black", // Adds a solid black border
              padding: "0.5rem 2.5rem", // Vertical padding: 8px, Horizontal padding: 40px
              borderRadius: "17px", // Fully rounded corners
              cursor: "pointer", // Pointer cursor on hover
              marginLeft: "auto", // Auto margin left
              marginRight: "auto", // Auto margin right
            }}
          >
            WebXR
          </button>
        </div>




        <div className="flex flex-col justify-center items-center">
          <img
            src="/f43.png"
            style={{
              width: "60%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <img
            src="/bronze.png"
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
            No. tokens
          </div>

          <button
            className="text-2xl text-center"
            style={{
              border: "2px solid black", // Adds a solid black border
              padding: "0.5rem 2.5rem", // Vertical padding: 8px, Horizontal padding: 40px
              borderRadius: "17px", // Fully rounded corners
              cursor: "pointer", // Pointer cursor on hover
              marginLeft: "auto", // Auto margin left
              marginRight: "auto", // Auto margin right
            }}
          >
            WebXR
          </button>
        </div>


      </div>
    </div>
  );
};

export default brand;
