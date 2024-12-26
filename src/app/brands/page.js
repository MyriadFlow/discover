"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header1 from "@/components/header1";
import Footer from "@/components/footer";
import { apiRequest } from "@/utils/api";
import Loader from "@/components/ui/Loader";
import Image from "next/image";

const Page = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBrands = async () => {
    try {
      setLoading(true);
      const result = await apiRequest(
        "/brands/all/554b4903-9a06-4031-98f4-48276c427f78"
      );
      setBrands(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div>
      <div className="z-10 fixed left-0 right-0">
        <Header1 />
      </div>

      <div className="font-bold text-black text-4xl pl-24 pt-32">
        All Brands
      </div>

      <div className="flex text-2xl justify-center flex-wrap gap-16 pb-52 mt-10">
        {loading ? (
          <Loader />
        ) : (
          brands?.map((brand, index) => {
            const logoUrl = `https://nftstorage.link/ipfs/${brand.logo_image.slice(
              7
            )}`;
            return (
              <Link
                href={`/brand/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                key={index}
              >
                <div
                  key={index}
                  className="flex flex-col justify-center items-center"
                >
                  <Image
                    src={logoUrl}
                    width={250}
                    height={250}
                    alt={brand.name}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={`${logoUrl}?w=10&h=10&q=10`}
                  />
                  <div className="flex justify-center mt-3 mb-5">
                    {brand.name}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      <div className="pt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
