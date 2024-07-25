import React from "react";
import Image from "next/image";
import type { BynderAsset } from "../lib/contentful/adjustedTypes";
import { transformBynderAsset } from "@/lib/contentful/Utils";

interface CarouselProps {
    slides: BynderAsset[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
    return slides && slides.length > 0 ? (
        <>
            <div className="carousel w-full p-4">
                {slides?.map((slide, index) => {
                    return (
                        <div
                            id={`carousel-${index}`}
                            key={`${index}-${slide.id}`}
                            className="carousel-item w-full"
                        >
                            <Image
                                alt={
                                    slide.description && slide.description.length > 0
                                        ? slide.description
                                        : slide.name
                                }
                                height="400"
                                width="1200"
                                unoptimized={true}
                                src={transformBynderAsset(
                                    slide,
                                    "io=transform:crop,width:1200,height:400"
                                )}
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
