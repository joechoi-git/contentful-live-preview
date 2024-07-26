import React from "react";
import Image from "next/image";
import type { BynderAsset } from "../lib/contentful/adjustedTypes";
import { transformBynderAsset } from "@/lib/contentful/Utils";

interface CarouselProps {
    slides: BynderAsset[];
    width: number;
    height: number;
    quality: number;
    background?: string; // hex-code
    isRandom?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
    slides,
    width,
    height,
    quality,
    background,
    isRandom
}) => {
    return slides && slides.length > 0 ? (
        <>
            <div className="carousel w-full p-4">
                {slides?.map((slide, index) => {
                    return (
                        <div
                            id={`carousel-${index}`}
                            key={`${index}-${slide.id}`}
                            className="carousel-item w-full mr-2"
                        >
                            <Image
                                alt={
                                    slide.description && slide.description.length > 0
                                        ? slide.description
                                        : slide.name
                                }
                                height={height}
                                width={width}
                                unoptimized={true}
                                src={transformBynderAsset(
                                    slide,
                                    `quality=${quality}&io=transform:fill,width:${width},height:${height},gravity:center`, // fill works well for large image assets
                                    // `quality=${quality}&io=transform:extend,width:${width},height:${height},background:${background ? background : "cccccc"}` // extend works well for small image assets
                                    isRandom
                                )}
                                className={`rounded-xl ${background ? background : ""}`}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                {slides?.map((slide, index) => {
                    return (
                        <a
                            href={`#carousel-${index}`}
                            key={`${index}-${slide.id}`}
                            className="btn bg-secondary hover:bg-accent text-secondary-content"
                        >
                            {index++}
                        </a>
                    );
                })}
            </div>
        </>
    ) : null;
};

export default Carousel;
