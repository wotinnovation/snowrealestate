'use client'
import React from 'react'
import Link from 'next/link'
import Slider from "react-slick";

var settings = {
    dots: false,
    slidesToShow: 2,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 3000,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
};

export default function PropertySlider({ images }: { images: string[] }) {
    if (!images || images.length === 0) return null;

    return (
        <div className="featured_slick_gallery gray">
            <div className="featured_slick_gallery-slide home-slider">
                <Slider {...settings}>
                    {images.map((src, index) => (
                        <div className="featured_slick_padd" key={index}>
                            <div className="mfp-gallery">
                                <img src={src} className="img-fluid mx-auto" alt={`Property view ${index + 1}`} style={{ height: '500px', width: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <Link href="#" className="btn-view-pic">View photos</Link>
        </div>
    )
}
