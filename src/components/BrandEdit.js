"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UploadIcon, PreviewIcon } from "../icons";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Brand name must be at least 2 characters" })
    .regex(/^[a-zA-Z0-9\s]*$/, {
      message: "Brand name must only contain letters and numbers",
    }),
  slogan: z
    .string()
    .min(2, { message: "Slogan must be at least 2 characters" }),
  website: z.string(),
  twitter: z.string(),
  instagram: z.string(),
  facebook: z.string(),
  additional_link: z.string(),
  link: z.string(),
  discord: z.string(),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters" })
    .max(1000, { message: "Description should be less than 1000 words" }),
  representative: z.string(),
  contact_email: z.string().email(),
  contact_phone: z.string(),
  shipping_address: z.string(),
  additional_info: z.string(),
  logo_image: z.string(),
  cover_image: z.string(),
});

const BrandEdit = ({ params, onCancel, onSaveComplete }) => {
  const { address: userAddress } = useAccount();
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState(null);
  const [cid, setCid] = useState("");
  const [cidCover, setCidCover] = useState("");
  const [imageError, setImageError] = useState(false);
  const [file, setFile] = useState(null);
  const [elevateRegion, setElevateRegion] = useState("");
  const inputFile = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      const baseUri =
        process.env.NEXT_PUBLIC_URI || "https://app.myriadflow.com";
      try {
        const res = await fetch(
          `${baseUri}/brands/all/554b4903-9a06-4031-98f4-48276c427f78`
        );
        const brands = await res.json();
        const brandName = params?.id
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
        const currentBrand = brands.find((b) => b.name === brandName);

        if (currentBrand?.logo_image) setCid(currentBrand.logo_image.slice(7));
        if (currentBrand?.cover_image)
          setCidCover(currentBrand.cover_image.slice(7));
        setBrand(currentBrand);
        setElevateRegion(currentBrand?.elevate_region || "");

        // Verify ownership
        if (
          currentBrand &&
          userAddress?.toLowerCase() !==
            currentBrand.payout_address?.toLowerCase()
        ) {
          toast.error("You don't have permission to edit this brand");
          onCancel();
          return {};
        }

        return currentBrand || {};
      } catch (error) {
        console.error("Error fetching brand data:", error);
        toast.error("Failed to load brand data");
        return {};
      }
    },
  });

  const uploadFile = async (fileToUpload, isCover = false) => {
    try {
      setLoading(true);
      const data = new FormData();
      data.set("file", fileToUpload);
      const res = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      if (isCover) {
        setCidCover(resData.IpfsHash);
      } else {
        setCid(resData.IpfsHash);
      }
      toast.success("Upload Completed!");
    } catch (e) {
      console.error(e);
      toast.error("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e, isCover = false) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      uploadFile(files[0], isCover);
    }
  };

  async function onSubmit(values) {
    try {
      setLoading(true);
      values.logo_image = cid ? "ipfs://" + cid : brand.logo_image;
      values.cover_image = cidCover ? "ipfs://" + cidCover : brand.cover_image;
      values.elevate_region = elevateRegion;

      const baseUri =
        process.env.NEXT_PUBLIC_URI || "https://app.myriadflow.com";
      const response = await fetch(`${baseUri}/brands/${brand.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to update brand");

      toast.success("Brand updated successfully");
      onSaveComplete();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update brand: " + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-4 px-32">
      <ToastContainer />
      <div className="px-16 py-8 border-b text-black border-black">
        <h1 className="font-bold uppercase text-3xl mb-4">Edit your brand</h1>
        <p>Update your brand details</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold mb-4">
                  Brand Name*
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-[#0000001A] rounded"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slogan"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold mb-4">
                  Brand Slogan*
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-[#0000001A] rounded"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold mb-4">
                  Brand Description*
                </FormLabel>
                <FormControl>
                  <Textarea className="border-0 bg-[#0000001A]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Sections */}
          <div className="space-y-8">
            <div className="flex gap-12">
              <div>
                <h3 className="text-2xl">Update Logo Image</h3>
                <div className="border border-dashed border-black h-60 w-[32rem] flex flex-col items-center justify-center p-6">
                  <UploadIcon />
                  <p>Drag file here to upload or choose file</p>
                  <p>Recommended size 512 x 512 px</p>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, false)}
                    accept="image/*"
                    className="mt-4"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl">Logo Preview</h3>
                {(cid || brand?.logo_image) && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${
                      cid || brand?.logo_image?.slice(7)
                    }`}
                    alt="Logo preview"
                    className="h-60 w-80 object-contain"
                  />
                )}
              </div>
            </div>

            <div className="flex gap-12">
              <div>
                <h3 className="text-2xl">Update Cover Image</h3>
                <div className="border border-dashed border-black h-60 w-[32rem] flex flex-col items-center justify-center p-6">
                  <UploadIcon />
                  <p>Drag file here to upload or choose file</p>
                  <p>Recommended size 1920 x 972 px</p>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, true)}
                    accept="image/*"
                    className="mt-4"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl">Cover Preview</h3>
                {(cidCover || brand?.cover_image) && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${
                      cidCover || brand?.cover_image?.slice(7)
                    }`}
                    alt="Cover preview"
                    className="h-60 w-80 object-contain"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <FormField
            name="representative"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold mb-4">
                  Name of Brand Representative *
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-[#0000001A] rounded"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="contact_email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold mb-4">
                  Contact Email*
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-[#0000001A] rounded"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="contact_phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold mb-4">
                  Contact Phone*
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-[#0000001A] rounded"
                    placeholder="Include country code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="shipping_address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold mb-4">
                  Shipping address for NFC tags*
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 bg-[#0000001A] rounded"
                    placeholder="Include name, street address, city, postal code, and country"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Social Links */}
          <div>
            <FormLabel className="text-xl font-semibold">
              Social Links
            </FormLabel>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormField
                name="website"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Website</FormLabel>
                    <FormControl>
                      <Input
                        className="border-0 bg-[#0000001A] rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="twitter"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">X (Twitter)</FormLabel>
                    <FormControl>
                      <Input
                        className="border-0 bg-[#0000001A] rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="instagram"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Instagram</FormLabel>
                    <FormControl>
                      <Input
                        className="border-0 bg-[#0000001A] rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="facebook"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Facebook</FormLabel>
                    <FormControl>
                      <Input
                        className="border-0 bg-[#0000001A] rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="additional_link"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <select
                        style={{
                          backgroundImage: "url('/choose-down-arrow.png')",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "16px 16px",
                          appearance: "none",
                          paddingRight: "2rem",
                        }}
                        className="bg-white rounded w-full h-10 mt-8 border border-black px-4 font-semibold"
                        {...field}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="link"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Link</FormLabel>
                    <FormControl>
                      <Input
                        className="border-0 bg-[#0000001A] rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="discord"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Discord</FormLabel>
                    <FormControl>
                      <Input
                        className="border-0 bg-[#0000001A] rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Elevate Program Section */}
          <div className="mt-8">
            <label className="flex items-center text-xl">
              <input
                type="checkbox"
                checked={!!elevateRegion}
                onChange={(e) => {
                  if (!e.target.checked) {
                    setElevateRegion("");
                  }
                }}
                className="mr-2"
              />
              My brand is part of MyriadFlow Elevate Program
            </label>

            {!!elevateRegion && (
              <div className="mt-6">
                <div className="flex flex-col gap-4">
                  <label>
                    Select Region
                    <select
                      className="border rounded px-2 py-1 border-black ml-2 w-96"
                      value={elevateRegion}
                      onChange={(e) => setElevateRegion(e.target.value)}
                      required
                    >
                      <option value="">Select Region</option>
                      <option value="Africa">Africa</option>
                      <option value="Asia">Asia</option>
                      <option value="Europe">Europe</option>
                      <option value="North America">North America</option>
                      <option value="South America">South America</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* AI Information */}
          <FormField
            name="additional_info"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold mb-4">
                  Brand Information for AI *
                </FormLabel>
                <FormDescription className="text-lg font-semibold">
                  Fill this field if you want to create an AI-powered brand
                  ambassador
                </FormDescription>
                <FormControl>
                  <Textarea
                    className="border-0 bg-[#0000001A] text-lg"
                    placeholder="Give as much information as possible about your brand. Anything you want the AI avatar to know and share with your customers."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              type="submit"
              className="bg-[#30D8FF] text-black hover:text-white rounded-full"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 text-black hover:bg-gray-300 rounded-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>

      {loading && (
        <div
          style={{
            display: "flex",
            position: "fixed",
            inset: 0,
            zIndex: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="bg-white p-4 rounded-lg">
            <img
              src="https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif"
              alt="Loading"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandEdit;
