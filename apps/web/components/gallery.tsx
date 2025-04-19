"use client";

import "yet-another-react-lightbox/styles.css";

import { SanityImage } from "components/sanity-image";
import {
  ArrowLeft,
  ArrowRight,
  DownloadIcon,
  ExpandIcon,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

interface GalleryProps {
  title: string;
  text?: string;
  index: number;
  images: any[]; // Assuming images is an array of image objects
}

export const Gallery = ({
  title,
  text,
  index,
  images,
  ...props
}: GalleryProps) => {
  const [slideIndex, setSlideIndex] = useState(-1);

  return (
    <div className="scroll-mt-12" id={title.replace(" ", "-").toLowerCase()}>
      <div className="flex flex-col gap-4 lg:container lg:mx-auto">
        <div
          {...props}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 rounded-lg overflow-hidden"
        >
          {images.map((image, index) => (
            <div
              key={`${image._id}-${index}`}
              className="aspect-square relative rounded-lg overflow-hidden cursor-pointer"
            >
              <div className="w-6 h-6 bg-black rounded-full absolute top-2 right-2 pointer-events-none z-10 flex items-center justify-center">
                <ExpandIcon className="w-3 h-3 text-white z-10" />
              </div>
              <SanityImage
                asset={image}
                alt={title}
                width={1600}
                loading="eager"
                priority
                height={900}
                className="rounded h-auto w-full object-cover aspect-square"
                sizes="(max-width: 1024px) 50vw, 314px"
                onClick={() => setSlideIndex(index)}
              />
            </div>
          ))}
        </div>

        <Lightbox
          index={slideIndex}
          slides={images.map((image) => {
            console.log(image);

            return image;
          })}
          open={slideIndex >= 0}
          close={() => setSlideIndex(-1)}
          render={{
            iconPrev: () => <ArrowLeft />,
            iconNext: () => <ArrowRight />,
            iconClose: () => <XIcon />,
          }}
        />
      </div>
    </div>
  );
};
