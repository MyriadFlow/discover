import Image from "next/image";
import MostLoved from "../components/mostLoved";
import MostRecently from "../components/mostRecently";
import LeaderBoard from "../components/leaderboard";
import HotNFTs from "../components/hotNFTs";
import Brand from "../components/brand";

export default function Home() {
  const exploreButtonStyle = {
    padding: "10px 40px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundImage: 'url("/Rectangle 12.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional: Add box-shadow for a better visual effect
  };

  return (
    <div className="bg-black">
      <div className="flex h-screen bg-white">
        <div className="w-1/2 h-full px-16 flex flex-col justify-center">
          <div className="text-7xl font-bold">Discover</div>
          <div className="text-6xl font-semibold mt-6">Phygital Xperience</div>
          <div className="text-6xl font-semibold mt-4">with MyriadFlow</div>
          <div className="text-2xl mt-10">
            Explore & launch brands and phygitals with a WebXR experience.
            Create & interact with AI-Powered brand ambassadors.
          </div>
          <div className="flex gap-10 mt-10">
            <button style={exploreButtonStyle}>Explore</button>
            <button style={exploreButtonStyle}>Launch</button>
          </div>
        </div>

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
            src="/image 4.png"
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
            src="/image 6.png"
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
            src="/image 8.png"
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
            src="/image 7.png"
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
            src="/image 5.png"
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

      <div
        className="text-4xl font-bold py-6"
        style={{
          textAlign: "center",
          backgroundImage:
            "linear-gradient(to right, #F45EC1 ,#F45EC1 , #F45EC1, #4EB9F3, #4EB9F3, #4EB9F3)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Real World Assets.
      </div>

      <div
        className="flex bg-white p-20"
        style={{
          position: "relative",
          width: "100%",
          height: "auto",
          justifyContent: "center",
        }}
      >
        <img
          src="/image 41.png"
          style={{
            position: "absolute",
            left: "40px",
            zIndex: "1",
            width: "180px",
            height: "auto",
            paddingBottom: "100px",
          }}
        />
        <img
          src="/image 51.png"
          style={{
            position: "absolute",
            left: "calc(0px + 180px + 2px)",
            zIndex: "2",
            width: "180px",
            height: "auto",
            paddingBottom: "100px",
          }}
        />
        <img
          src="/2_small 1.png"
          style={{
            position: "absolute",
            left: "calc(0px + 360px - 30px)",
            zIndex: "3",
            width: "180px",
            height: "auto",
            paddingBottom: "100px",
          }}
        />
        <img
          src="/image 9.png"
          style={{
            position: "absolute",
            left: "calc(0px + 540px - 60px)",
            zIndex: "4",
            width: "180px",
            height: "auto",
            paddingBottom: "100px",
          }}
        />
        <img
          src="/image 10.png"
          style={{
            position: "absolute",
            left: "calc(0px + 720px - 80px)",
            zIndex: "5",
            width: "180px",
            height: "auto",
            paddingBottom: "100px",
          }}
        />
        <img
          src="/image 13.png"
          style={{
            position: "absolute",
            left: "calc(0px + 900px - 100px)",
            zIndex: "6",
            width: "180px",
            height: "auto",
            paddingBottom: "100px",
          }}
        />
        <img
          src="/image 11.png"
          style={{
            position: "absolute",
            left: "calc(0px + 1080px - 120px)",
            zIndex: "7",
            width: "180px",
            height: "auto",
            paddingBottom: "100px",
          }}
        />
        <img
          src="/image 14.png"
          style={{
            position: "absolute",
            left: "calc(0px + 1260px - 140px)",
            zIndex: "8",
            width: "180px",
            height: "auto",
            paddingBottom: "100px",
          }}
        />
      </div>

<div className="pt-60 bg-white px-10">
      <MostLoved />
      </div>

      <div className="pt-40 bg-white px-10">
      <MostRecently />
      </div>

      <div className="pt-40 bg-white">
      <LeaderBoard />
      </div>

      <div className="pt-40 bg-white px-10">
      <HotNFTs />
      </div>

      <div className="pt-40 bg-white px-10">
      <Brand />
      </div>

    </div>
  );
}
