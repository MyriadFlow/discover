import React from "react";
import Image from "next/image";

const LoaderAnimated = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-auto"
      id="popupmodal"
    >
      <div className="relative p-4 w-full max-h-full">
        <div className="relative rounded-lg shadow-md">
          <div className="flex justify-center gap-4">
            <Image
              src="https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif"
              alt="Loading icon"
              className="loader-image"
              width={100}
              height={100}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderAnimated;
