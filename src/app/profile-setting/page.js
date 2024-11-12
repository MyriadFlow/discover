"use client";
import React, { useState, useEffect } from "react";
import Header1 from "../../components/header1";
import Footer from "../../components/footer";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

function ProfileSettingsPage() {
  const { address } = useAccount();

  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [x, setx] = useState("");
  const [instagram, setInstagram] = useState("");
  const [discord, setDiscord] = useState("");
  const [allusernames, setAllUsernames] = useState([]);
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [profileid, setId] = useState("");
  const [selectedSocialLink, setSelectedSocialLink] = useState("");
  const [link, setLink] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isCoverHovered, setIsCoverHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isCoverPopupVisible, setIsCoverPopupVisible] = useState(false);
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isAddressesOpen, setIsAddressesOpen] = useState(false);

  const [currentSection, setCurrentSection] = useState("profile");
  const [validationError, setValidationError] = useState("");
  const [editLoading, setEditLoading] = useState(false)

  const [addresses, setAddresses] = useState([
    {
      id: "",
      full_name: "",
      street_address: "",
      street_address_2: "",
      city: "",
      pincode: "",
      country: "",
    },
  ]);
  const countries = ["USA", "Canada", "UK", "Australia"];

  const handleAddAddress = () => {
    // Use functional update to ensure the latest state is used
    setAddresses((prevAddresses) => [
      ...prevAddresses,
      {
        id: uuidv4(),
        full_name: "",
        street_address: "",
        street_address_2: "",
        city: "",
        pincode: "",
        country: "",
      },
    ]);
  };

  const handleAddressChange = (index, field, value) => {
    // Use functional update to ensure the latest state is used
    setAddresses((prevAddresses) => {
      const newAddresses = [...prevAddresses];
      newAddresses[index][field] = value;
      return newAddresses; // Return the updated addresses
    });
  };

  const baseUri = process.env.NEXT_PUBLIC_URI || "https://app.myriadflow.com";

  const deleteAddress = async (id) => {
    try {
      const response = await fetch(`${baseUri}/profiles/addresses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Address deleted successfully!");
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete address: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting the address.");
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(
        `${baseUri}/profiles/walletandemail/${address}/${email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Account deleted successfully!");
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete account: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting the account.");
    }
  };

  const handleDelete = () => {
    setShowForm(true);
  };

  const handleSave = async () => {
    console.log("updating")
    // Validate username length
    // if (userName.length < 4) {
    //   setValidationError("Username must be at least 4 characters long.");
    //   return;
    // } else if (userName !== userName.toLowerCase()) {
    //   setValidationError("Username must be in lowercase.");
    //   return;
    // } else if (userName.includes(" ")) {
    //   setValidationError("Username cannot contain spaces.");
    //   return;
    // } else if (allusernames.some((profile) => profile.username === userName)) {
    //   setValidationError("This username is already taken.");
    //   return;
    // } else if (!/^[a-z]+$/.test(userName)) {
    //   setValidationError(
    //     "Username can only contain letters (no special characters)."
    //   );
    //   return;
    // } else {
    //   setValidationError("");
    // }

    const profileData = {
      name: displayName,
      email: email,
      username: userName,
      bio: bio,
      website: website,
      x: x,
      instagram: instagram,
      discord: discord,
      cover_image: coverImage,
      profile_image: profileImage,
      selected_social_link: selectedSocialLink,
      link: link,
    };

    setEditLoading(true)
    try {
      const response = await fetch(`${baseUri}/profiles/${address}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      await Promise.all(
        addresses.map(async (addressesall, index) => {
          if (addressesall.id && addressesall.id === addressesall.id) {
            try {
              const addressData = await fetch(
                `${baseUri}/profiles/addresses/${profileid}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(addresses),
                }
              );

              if (addressData.ok) {
                toast.success("Address updated successfully!");
                console.log("Address Updated Successfully");
              }
            } catch (error) {
              console.error("Error fetching address data", error);
            }
          } else {
            try {
              const responseAddress = await fetch(
                `${baseUri}/profiles/addresses/${profileid}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(addresses),
                }
              );
              if (responseAddress.ok) {
                console.log("Address Added Successfully");
              }
            } catch (error) {
              console.error("Failed to save profile settings.");
            }
          }
        })
      );

      if (response.ok) {
        toast.success("Profile settings saved successfully!");
        console.log("Profile settings saved successfully!");
        setIsEditing(false);
      } else {
        console.error("Failed to save profile settings.");
        toast.error("Failed to save profile settings.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setEditLoading(false)
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileUpload = async (type) => {
    if (!selectedFile) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.set("file", selectedFile);

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const ipfsHash = data.IpfsHash;
        if (type === "cover") {
          setCoverImage(ipfsHash);
          console.log("Coverimage", coverImage);
          setIsCoverPopupVisible(false);
        } else if (type === "profile") {
          setProfileImage(ipfsHash);
          setIsProfilePopupVisible(false);
        }
        setIsEditing(true); // Enable save button after upload
      } else {
        console.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditClick = (type) => {
    if (type === "cover") {
      setIsCoverPopupVisible(true);
    } else if (type === "profile") {
      setIsProfilePopupVisible(true);
    }
  };

  const handleButtonClick = (section) => {
    setCurrentSection(section);
  };

  useEffect(() => {
    const getUserData = async () => {
      if (address) {
        try {
          const response = await fetch(
            `${baseUri}/profiles/wallet/${address}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setId(data.id);
            setDisplayName(data.name);
            setUserName(data.username);
            setCoverImage(data.cover_image);
            setProfileImage(data.profile_image);
            setBio(data.bio);
            setWebsite(data.website);
            setx(data.x);
            setInstagram(data.instagram);
            setDiscord(data.discord);
            setSelectedSocialLink(data.selected_social_link);
            setLink(data.link);
            setEmail(data.email);
          } else {
            console.log("No user found");
          }
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    };
    getUserData();
  }, [address]);

  useEffect(() => {
    if (profileid) {
      const getAddressData = async () => {
        try {
          const addressData = await fetch(
            `${baseUri}/profiles/addresses/${profileid}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (addressData.ok) {
            const addressdata = await addressData.json();
            setAddresses(addressdata);
          }
        } catch (error) {
          console.error("Error fetching address data", error);
        }
      };

      getAddressData();
    }
  }, [profileid]);

  useEffect(() => {
    if (address) {
      const getAllProfile = async () => {
        try {
          const usernameData = await fetch(`${baseUri}/profiles/all`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (usernameData.ok) {
            const usernamedata = await usernameData.json();
            setAllUsernames(usernamedata);
          }
        } catch (error) {
          console.error("Error fetching address data", error);
        }
      };

      getAllProfile();
    }
  }, [address]);

  return (
    <>
      <div style={{ zIndex: 10, position: "fixed", left: 0, right: 0, top: 0 }}>
        <Header1 />
      </div>

      <h1
        className="text-4xl"
        style={{ marginTop: "150px", marginLeft: "50px" }}
      >
        Profile Settings
      </h1>
      <div style={{ display: "flex", padding: "40px" }}>
        {/* Sidebar */}
        <div
          style={{
            flexDirection: "column",
            maxWidth: "300px",
            marginRight: "30px",
          }}
        >
          <button
            style={{
              padding: "15px",
              marginBottom: "10px",
              color: currentSection === "profile" ? "#7D4AB5" : "#6B7280",
              fontWeight: "500",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => handleButtonClick("profile")}
          >
            Profile
          </button>{" "}
          <br />
          <button
            style={{
              padding: "15px",
              marginBottom: "10px",
              color: currentSection === "account" ? "#7D4AB5" : "#6B7280",
              fontWeight: "500",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => handleButtonClick("account")}
          >
            Account
          </button>{" "}
          <br />
          <button
            style={{
              padding: "15px",
              marginBottom: "10px",
              color: currentSection === "notifications" ? "#7D4AB5" : "#6B7280",
              fontWeight: "500",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => handleButtonClick("notifications")}
          >
            Notifications
          </button>
          {instagram || x ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#F3E9FE",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                maxWidth: "300px",
                marginTop: "30px",
              }}
            >
              <p style={{ color: "#6B7280", marginBottom: "20px" }}>
                You have completed the verification process. Your profile is
                visible on the Users page.
              </p>

              <img
                src="/verified.png"
                alt="Verified Icon"
                style={{ width: "50px", height: "50px", marginBottom: "20px" }}
              />
              <Link href="/users">
                <button
                  style={{
                    backgroundColor: "#7D4AB5",
                    color: "#ffffff",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Users
                </button>
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#F3E9FE",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                maxWidth: "300px",
                marginTop: "30px",
              }}
            >
              <img
                src="/verified.png"
                alt="Verified Icon"
                style={{ width: "50px", height: "50px", marginBottom: "20px" }}
              />
              <p style={{ color: "#6B7280", marginBottom: "20px" }}>
                Click to proceed with the verification process to become a
                creator and gain the trust of the community!
              </p>
              <button
                style={{
                  backgroundColor: "#7D4AB5",
                  color: "#ffffff",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() => handleButtonClick("get verified")}
              >
                Get Verified!
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ flex: 3, marginRight: "50px" }}>
          {currentSection === "profile" ? (
            <>
              {/* Cover image */}
              <div
                style={{
                  height: "250px",
                  // backgroundColor: coverImage ? 'transparent' : '#D1D5DB',
                  backgroundImage: coverImage
                    ? `url(https://gateway.pinata.cloud/ipfs/${coverImage})`
                    : "#D1D5DB",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setIsCoverHovered(true)}
                onMouseLeave={() => setIsCoverHovered(false)}
                onClick={() => handleEditClick("cover")}
              >
                {isCoverHovered && (
                  <button
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "20px",
                      backgroundColor: "#4B5563",
                      color: "#ffffff",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Edit Cover
                  </button>
                )}

                <div
                  style={{
                    position: "absolute",
                    left: "15%",
                    transform: "translateX(-50%)",
                    bottom: "-46px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setIsProfileHovered(true)}
                  onMouseLeave={() => setIsProfileHovered(false)}
                  onClick={() => handleEditClick("profile")}
                >
                  <img
                    src={
                      profileImage
                        ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileImage}`
                        : "/profile.png"
                    }
                    alt="Profile"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      border: "4px solid white",
                      objectFit: "cover",
                    }}
                  />

                  {isProfileHovered && (
                    <button
                      style={{
                        position: "absolute",
                        right: "40px",
                        top: "110px",
                        backgroundColor: "#4B5563",
                        color: "#ffffff",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div style={{ marginTop: "100px" }}>
                <label
                  style={{
                    display: "block",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  Display Name
                </label>
                <input
                  className="w-1/2"
                  type="text"
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                    setIsEditing(true);
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #D1D5DB",
                    width: "50%",
                    marginBottom: "20px",
                  }}
                />
                <label
                  style={{
                    display: "block",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  Email
                </label>
                <input
                  className="w-1/2"
                  type="text"
                  disabled
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEditing(true);
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #D1D5DB",
                    width: "50%",
                    marginBottom: "20px",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  User Name
                </label>
                <input
                  className="w-1/2"
                  type="text"
                  placeholder="Enter your new username here"
                  value={userName}
                  disabled
                  onChange={(e) => {
                    setUserName(e.target.value);
                    setIsEditing(true);
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #D1D5DB",
                    width: "50%",
                    marginBottom: "20px",
                  }}
                />
                {/* {validationError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      marginBottom: "20px",
                    }}
                  >
                    {validationError}
                  </p>
                )} */}

                <label
                  style={{
                    display: "block",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  Bio
                </label>
                <textarea
                  className="w-1/2"
                  placeholder="A few words about yourself"
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                    setIsEditing(true);
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #D1D5DB",
                    width: "50%",
                    marginBottom: "20px",
                    minHeight: "100px",
                  }}
                />
                <h1
                  style={{
                    display: "block",
                    fontWeight: "300",
                    marginBottom: "10px",
                    marginTop: "30px",
                    fontSize: "32px",
                  }}
                >
                  Social Links
                </h1>

                <label
                  style={{
                    display: "block",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  Website
                </label>
                <input
                  className="w-1/2"
                  type="text"
                  placeholder="https://"
                  value={website}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                    setIsEditing(true);
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #D1D5DB",
                    width: "50%",
                    marginBottom: "20px",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  Twitter
                </label>
                <input
                  className="w-1/2"
                  type="text"
                  placeholder="https://"
                  value={x}
                  onChange={(e) => {
                    setx(e.target.value);
                    setIsEditing(true);
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #D1D5DB",
                    width: "50%",
                    marginBottom: "20px",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  Instagram
                </label>
                <input
                  className="w-1/2"
                  type="text"
                  placeholder="https://"
                  value={instagram}
                  onChange={(e) => {
                    setInstagram(e.target.value);
                    setIsEditing(true);
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #D1D5DB",
                    width: "50%",
                    marginBottom: "20px",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  Discord
                </label>
                <input
                  className="w-1/2"
                  type="text"
                  value={discord}
                  onChange={(e) => {
                    setDiscord(e.target.value);
                    setIsEditing(true);
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #D1D5DB",
                    width: "50%",
                    marginBottom: "20px",
                  }}
                />

                <select
                  className="border-0 bg-[#0000001A] rounded w-1/2 h-10 mt-8 mb-6"
                  style={{ display: "block" }}
                  value={selectedSocialLink}
                  onChange={(e) => {
                    setSelectedSocialLink(e.target.value);
                    setIsEditing(true);
                  }}
                >
                  <option value="">+ Choose</option>
                  <option value="telegram">Telegram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="google">Google</option>
                  <option value="tiktok">TikTok</option>
                  <option value="snapchat">Snapchat</option>
                  <option value="pinterest">Pinterest</option>
                </select>
                <input
                  className="w-1/2"
                  type="text"
                  placeholder="https://"
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                    setIsEditing(true);
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #D1D5DB",
                    width: "50%",
                    marginBottom: "20px",
                  }}
                />

                <div className="mt-16 mb-20">
                  <button
                    onClick={() => setIsAddressesOpen(!isAddressesOpen)}
                    className="w-full flex justify-between items-center text-4xl mb-4 bg-transparent border-none cursor-pointer"
                    style={{ padding: "10px 0" }}
                  >
                    <h1>My Delivery Addresses</h1>
                    <span
                      style={{
                        transform: isAddressesOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  <div
                    style={{
                      maxHeight: isAddressesOpen ? "2000px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.3s ease-in-out",
                    }}
                  >
                    {addresses.length > 0 ? (
                      addresses.map((address, index) => (
                        <div key={index} style={{ marginBottom: "20px" }}>
                          <h2
                            className="text-2xl"
                            style={{ marginBottom: "20px" }}
                          >
                            Address {index + 1}
                          </h2>
                          <label
                            style={{
                              display: "block",
                              fontWeight: "500",
                              marginBottom: "10px",
                            }}
                          >
                            Full Name
                          </label>
                          <input
                            className="w-1/2"
                            type="text"
                            value={address.full_name}
                            onChange={(e) => {
                              handleAddressChange(
                                index,
                                "full_name",
                                e.target.value
                              );
                              setIsEditing(true);
                            }}
                            style={{
                              display: "block",
                              marginBottom: "10px",
                              padding: "10px",
                              borderRadius: "8px",
                              border: "1px solid #D1D5DB",
                            }}
                          />
                          <label
                            style={{
                              display: "block",
                              fontWeight: "500",
                              marginBottom: "10px",
                            }}
                          >
                            Street Address
                          </label>
                          <input
                            className="w-1/2"
                            type="text"
                            value={address.street_address}
                            onChange={(e) => {
                              handleAddressChange(
                                index,
                                "street_address",
                                e.target.value
                              );
                              setIsEditing(true);
                            }}
                            style={{
                              display: "block",
                              marginBottom: "10px",
                              padding: "10px",
                              borderRadius: "8px",
                              border: "1px solid #D1D5DB",
                            }}
                          />
                          <label
                            style={{
                              display: "block",
                              fontWeight: "500",
                              marginBottom: "10px",
                            }}
                          >
                            Street Address Line 2 (optional)
                          </label>
                          <input
                            className="w-1/2"
                            type="text"
                            value={address.street_address_2}
                            onChange={(e) => {
                              handleAddressChange(
                                index,
                                "street_address_2",
                                e.target.value
                              );
                              setIsEditing(true);
                            }}
                            style={{
                              display: "block",
                              marginBottom: "10px",
                              padding: "10px",
                              borderRadius: "8px",
                              border: "1px solid #D1D5DB",
                            }}
                          />
                          <label
                            style={{
                              display: "block",
                              fontWeight: "500",
                              marginBottom: "10px",
                            }}
                          >
                            City
                          </label>
                          <input
                            className="w-1/2"
                            type="text"
                            value={address.city}
                            onChange={(e) => {
                              handleAddressChange(
                                index,
                                "city",
                                e.target.value
                              );
                              setIsEditing(true);
                            }}
                            style={{
                              display: "block",
                              marginBottom: "10px",
                              padding: "10px",
                              borderRadius: "8px",
                              border: "1px solid #D1D5DB",
                            }}
                          />
                          <label
                            style={{
                              display: "block",
                              fontWeight: "500",
                              marginBottom: "10px",
                            }}
                          >
                            Pincode / Zipcode
                          </label>
                          <input
                            className="w-1/2"
                            type="text"
                            value={address.pincode}
                            onChange={(e) => {
                              handleAddressChange(
                                index,
                                "pincode",
                                e.target.value
                              );
                              setIsEditing(true);
                            }}
                            style={{
                              display: "block",
                              marginBottom: "10px",
                              padding: "10px",
                              borderRadius: "8px",
                              border: "1px solid #D1D5DB",
                            }}
                          />
                          <label
                            style={{
                              display: "block",
                              fontWeight: "500",
                              marginBottom: "10px",
                            }}
                          >
                            Country
                          </label>
                          <input
                            className="w-1/2"
                            type="text"
                            value={address.country}
                            onChange={(e) => {
                              handleAddressChange(
                                index,
                                "country",
                                e.target.value
                              );
                              setIsEditing(true);
                            }}
                            style={{
                              display: "block",
                              marginBottom: "10px",
                              padding: "10px",
                              borderRadius: "8px",
                              border: "1px solid #D1D5DB",
                            }}
                          />
                          <button
                            className="p-4"
                            style={{
                              backgroundColor: "#7D4AB5",
                              color: "#ffffff",
                              padding: "10px 20px",
                              borderRadius: "8px",
                              cursor: "pointer",
                              marginTop: "20px",
                            }}
                            onClick={() => deleteAddress(address.id)}
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xl">
                        No addresses available. Please add a delivery address.
                      </p>
                    )}
                    {addresses.length > 0 ? (
                      <button
                        onClick={handleAddAddress}
                        style={{
                          backgroundColor: "#7D4AB5",
                          color: "#ffffff",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          marginTop: "20px",
                        }}
                      >
                        Add another delivery address
                      </button>
                    ) : (
                      <button
                        onClick={handleAddAddress}
                        style={{
                          backgroundColor: "#7D4AB5",
                          color: "#ffffff",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          marginTop: "20px",
                        }}
                      >
                        Add delivery address
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                style={{
                  backgroundColor: "#30D8FF",
                  color: "#FFFFFF",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                {editLoading ? "Saving changes..." : "Save Changes"}
              </button>

              {isCoverPopupVisible && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "30px",
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center", // Ensures text is centered
                    }}
                  >
                    <h2 style={{ marginBottom: "20px" }} className="text-3xl">
                      Upload Cover Image
                    </h2>
                    <h2
                      style={{
                        fontFamily: "Bai Jamjuree, sans-serif",
                        fontWeight: 300,
                        fontSize: "15px",
                        lineHeight: "27.5px",
                        color: "black",
                      }}
                    >
                      Choose an image to display as your cover. <br />{" "}
                      Recommended size 1920 x 486px
                    </h2>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="mt-4 "
                    />
                    <button
                      onClick={() => handleFileUpload("cover")}
                      style={{
                        backgroundColor: "#30D8FF",
                        color: "black",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginTop: "20px",
                        display: "block",
                        width: "100%",
                      }}
                    >
                      {isUploading ? "Uploading..." : "Upload File"}
                    </button>
                    <button
                      onClick={() => setIsCoverPopupVisible(false)}
                      style={{
                        backgroundColor: "#E5E7EB",
                        color: "#000000",
                        padding: "10px 40px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginTop: "10px",
                        display: "block",
                        width: "100%",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {isProfilePopupVisible && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "30px",
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center", // Ensures text is centered
                    }}
                  >
                    <h2 style={{ marginBottom: "20px" }} className="text-3xl">
                      Upload Profile Image
                    </h2>
                    <h2
                      style={{
                        fontFamily: "Bai Jamjuree, sans-serif",
                        fontWeight: 300,
                        fontSize: "15px",
                        lineHeight: "27.5px",
                        color: "black",
                      }}
                    >
                      Choose an image to display as your avatar. <br />{" "}
                      Recommended size 512 x 512px
                    </h2>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="mt-4 "
                    />
                    <button
                      onClick={() => handleFileUpload("profile")}
                      style={{
                        backgroundColor: "#30D8FF",
                        color: "black",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginTop: "20px",
                        display: "block",
                        width: "100%",
                      }}
                    >
                      {isUploading ? "Uploading..." : "Upload File"}
                    </button>
                    <button
                      onClick={() => setIsProfilePopupVisible(false)}
                      style={{
                        backgroundColor: "#E5E7EB",
                        color: "#000000",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginTop: "10px",
                        display: "block",
                        width: "100%",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : currentSection === "account" ? (
            <div style={{ padding: "20px", marginLeft: "10px" }}>
              <div style={{ marginBottom: "40px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "1.25rem",
                    marginBottom: "8px",
                  }}
                >
                  Email Address
                </label>
                <div
                  style={{
                    backgroundColor: "#E5E7EB",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    color: "#6B7280",
                    fontSize: "1rem",
                    width: "300px",
                  }}
                >
                  {email}
                </div>
              </div>

              {/* Danger Zone Section */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "1.25rem",
                    marginBottom: "8px",
                    color: "#EF4444",
                  }}
                >
                  Danger Zone
                </label>
                <button
                  style={{
                    backgroundColor: "#E5E7EB",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    color: "#EF4444",
                    fontSize: "1rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleDelete}
                >
                  Delete My Account
                </button>
              </div>
              {showForm && (
                <div
                  className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center"
                  style={{
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    WebkitBoxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    MozBoxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <div className="flex flex-col bg-white rounded-lg p-20 max-w-md w-full text-center">
                    <h2
                      className="text-3xl mb-4"
                      style={{
                        background:
                          "linear-gradient(90deg, #30D8FF 0%, #5B0292 100%)",
                        backgroundClip: "text",
                        color: "transparent",
                        fontFamily: "Bai Jamjuree, sans-serif",
                      }}
                    >
                      Are You Sure?
                    </h2>
                    <h2
                      style={{
                        fontFamily: "Bai Jamjuree, sans-serif",
                        fontWeight: 300,
                        fontSize: "15px",
                        lineHeight: "27.5px",
                        textAlign: "center",
                        color: "black",
                      }}
                    >
                      When you delete your account, we will delete all your
                      data. This action cannot be undone.
                    </h2>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      className="w-full p-2 mb-2 rounded-md border border-gray-300 mt-4"
                      required
                    />
                    <button
                      onClick={deleteAccount}
                      style={{
                        backgroundColor: "#E5E7EB",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        color: "#EF4444",
                        fontSize: "1rem",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Delete account Forever
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="w-full py-2 mt-2 rounded-md border border-gray-300 bg-white text-black"
                    >
                      Cancle
                    </button>
                  </div>
                </div>
              )}
              {/* Warning Text */}
              <div style={{ color: "black", fontSize: "0.875rem" }}>
                This action cannot be undone!
              </div>
            </div>
          ) : currentSection === "get verified" ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "500px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h2
                  className="text-5xl mb-4"
                  style={{
                    background:
                      "linear-gradient(90deg, #30D8FF 0%, #5B0292 100%)",
                    backgroundClip: "text",
                    color: "transparent",
                    fontFamily: "Bai Jamjuree, sans-serif",
                  }}
                >
                  Hold on!
                </h2>
                <h2
                  style={{
                    fontFamily: "Bai Jamjuree, sans-serif",
                    fontWeight: 300,
                    fontSize: "25px",
                    lineHeight: "27.5px",
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  To begin your verification process, you must link your X or
                  Instagram account.
                </h2>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "500px",
                backgroundColor: "#F3F4F6",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  color: "#6B7280",
                  fontSize: "2rem",
                  textAlign: "center",
                }}
              >
                Coming Soon
              </h2>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default ProfileSettingsPage;
