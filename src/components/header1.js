"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useAccount, useDisconnect } from "wagmi";

const Header1 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const pathname = usePathname();
  const [name , setName] = useState('');
  const [profileImage, setProfileImage] = useState('');


  useEffect(() => {
    const getUserData = async () => {
      if (address) {
        try {
          const response = await fetch(`${baseUri}/profiles/wallet/${address}`, {
            method: 'GET',
            headers: {
              'content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data.name);
            setProfileImage(data.profile_image);
            
          } else {
            console.log('No user found');
          }
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      }
    };
    getUserData();
  }, [address]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

	const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

  useEffect(()=>{
      const getUserData = async ()=>{
        if(address){
          try{
            const response = await fetch(`${baseUri}/profiles/wallet/${address}` , {
              method:'GET',
              headers:{
                'content-Type':'application/json',
              },
            });

            if(response.ok){
              const data = await response.json();
              console.log(data.name);
              setName(data.name);

            }else{
              console.log('No user found')
            }
          }catch(error){
            console.error('Error fetching user data', error);
          }
        }
      };
      getUserData();
  }, [address]);


  const handleLogout = () => {
    disconnect();
  };

  const getLinkColor = (path) => {
    return pathname === path ? "#DF1FDD" : isScrolled ? "white" : "black";
  };

  return (
    <>
      <div
        className="px-10"
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: isScrolled ? "black" : "transparent",
          transition: "background 0.3s ease-in-out",
          color: isScrolled ? "white" : "black",
          paddingBottom: "10px",
        }}
      >
        <div className="mt-4">
          <a href="/">
            <img
              src={isScrolled ? "/logo2.png" : "/logo.png"}
              style={{ width: "200px" }}
            />
          </a>
        </div>
        <div
          style={{ display: "flex", gap: "40px", fontSize: "20px" }}
          className="font-bold mt-10"
        >
          <Link href="/" style={{ color: getLinkColor("/") }}>
            Home
          </Link>
          <Link href="/#movetotrends" style={{ color: getLinkColor("/#movetotrends") }}>
            Explore
          </Link>
          <Link href="/collections" style={{ color: getLinkColor("/collections") }}>
            Collections
          </Link>
          <Link href="/brands" style={{ color: getLinkColor("/brands") }}>
            Brands
          </Link>
          <Link href="/profile" style={{ color: getLinkColor("/profile") }}>
            Users
          </Link>
        </div>
        <div className="mt-10 flex" style={{ gap: '20px', marginRight:'80px'}}> 
          {address ? (
            <>
              {/* User Section */}
              <div className="relative">
                <button
                  className="space-x-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                >
                  <img
                    src={profileImage ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}` : "/profile.png"}
                    alt="Profile"
                    style={{ width: '40px', height: '40px' , borderRadius:'30px' }}
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute right-10 mt-2 p-6 bg-white rounded-lg shadow-xl"
                    style={{ zIndex: 10, display: 'flex', flexDirection: 'column', width: '250px' }} 
                  >
                   
                    <div className="flex items-center px-4 py-2">
                      <img
                         src={profileImage ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}` : "/profile.png"} 
                        alt="Profile"
                        style={{ width: '40px', height: '40px' , marginRight:'4px' , borderRadius:'30px'}}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-black">{name}</span>
                        <Link href="/profile" className="text-xs text-gray-500 hover:underline">
                          View profile
                        </Link>
                      </div>
                    </div>

                    
                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                      My assets
                    </Link>
                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                      On sale
                    </Link>
                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                      My brands
                    </Link>
                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                      My collections
                    </Link>
                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                      Activity
                    </Link>
                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                      Rewards
                    </Link>
                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                      Create
                    </Link>
                    <Link href="/profile-setting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                      Profile Settings
                    </Link>

                    {/* Wallet Address */}
                    <div className="px-4 py-2 text-xs text-gray-500 truncate-wallet">
                      {address} 
                    </div>

                    {/* Separator */}
                    <div className="border-t border-gray-200 my-2"></div>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
                    >
                      Log out
                    </button>
                  </div>
                )}

              </div>

              {/* Notification Section */}
              <div>
                <button className="text-xl">
                  <img
                    src="/notification.png"
                    alt="Notification"
                    style={{ width: '45px', height: '45px' }}
                  />
                </button>
              </div>

              {/* Cart Section */}
              <div>
                <button className="text-xl">
                  <img
                    src="/cart.png"
                    alt="Cart"
                    style={{ width: '42px', height: '45px' }}
                  />
                </button>
              </div>
            </>
          ) : (
              <w3m-button />
          )}
        </div>
      </div>
      <ToastContainer
        className="absolute top-0 right-0 "
        containerId="containerA"
      />
    </>
  );
};

export default Header1;
