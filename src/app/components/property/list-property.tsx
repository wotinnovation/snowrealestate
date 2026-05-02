'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import dynamic from 'next/dynamic';

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import '../../../../node_modules/tiny-slider/dist/tiny-slider.css'

const settings = {
    items: 1,
    controls: false,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    nav: true,
    speed: 400,
    gutter: 0,
};

import { SnowProperty } from '@/app/data/snow-properties';

export default function ListProperty({item}:{item:SnowProperty}) {
  const images = [item.image, ...item.gallery];
  return (
        <div className="property-listing list_view style_new">
            <div className="listing-img-wrapper position-relative">
                <div className="position-absolute top-0 left-0 ms-3 mt-3 z-1">
                    {item.status === 'For Sale' && (
                        <div className="label bg-success text-light d-inline-flex align-items-center justify-content-center mx-1">
                            For Sale
                        </div>
                    )}
                    {item.status === 'For Rent' && (
                        <div className="label bg-purple text-light d-inline-flex align-items-center justify-content-center mx-1">
                            For Rent
                        </div>
                    )}
                </div>
                <div className="list-img-slide">
                    <div className="clior">
                        <TinySlider settings={settings}>
                            {images.map((el:any, index:number) => {
                                return(
                                    <div key={index}><Link href={`/single-property-1/${item.id}`}><Image src={el} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid mx-auto" alt="" /></Link></div>
                                )
                            })}
                        </TinySlider>
                    </div>
                </div>
            </div>

            
            
             <div className="list_view_flex">
            
                <div className="listing-detail-wrapper mt-1">
                    <div className="listing-short-detail-wrap">
                        <div className="_card_list_flex mb-2">
                            <div className="_card_flex_01 d-flex align-items-center">
                                {item.status === "For Rent" && <span className="label bg-light-success text-success me-2">For Rent</span>}
                                {item.status === "For Sale" && <span className="label bg-light-danger text-danger me-2">For Sale</span>}
                                <span className="label bg-light-purple text-purple">{item.type}</span>
                            </div>
                            <div className="_card_flex_last">
                                <h6 className="listing-info-price text-primary fs-4 mb-0">{item.priceLabel}</h6>
                            </div>
                        </div>
                        <div className="_card_list_flex">
                            <div className="_card_flex_01">
                                <h4 className="listing-name mt-3"><Link href={`/single-property-1/${item.id}`} className="prt-link-detail">{item.name} - {item.address}</Link></h4>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="price-features-wrapper">
                    <div className="list-fx-features d-flex align-items-center justify-content-between">
                        <div className="listing-card d-flex align-items-center">
                            <div className="square--30 text-muted-2 fs-sm circle gray-simple me-2"><i className="fa-solid fa-building-shield fs-sm"></i></div><span className="text-muted-2">{item.bedrooms}</span>
                        </div>
                        <div className="listing-card d-flex align-items-center">
                            <div className="square--30 text-muted-2 fs-sm circle gray-simple me-2"><i className="fa-solid fa-bed fs-sm"></i></div><span className="text-muted-2">{item.beds} Beds</span>
                        </div>
                        <div className="listing-card d-flex align-items-center">
                            <div className="square--30 text-muted-2 fs-sm circle gray-simple me-2"><i className="fa-solid fa-clone fs-sm"></i></div><span className="text-muted-2">{item.sqft}</span>
                        </div>
                    </div>
                </div>
                
                <div className="listing-detail-footer d-flex align-items-center justify-content-between">
                    <div className="footer-first">
                        <div className="foot-rates">
                            <span className="elio_rate perfect">4.7</span>
                            <div className="_rate_stio">
                                <i className="fa fa-star" style={{margin:'0 2px'}}></i>
                                <i className="fa fa-star" style={{margin:'0 2px'}}></i>
                                <i className="fa fa-star" style={{margin:'0 2px'}}></i>
                                <i className="fa fa-star" style={{margin:'0 2px'}}></i>
                                <i className="fa fa-star" style={{margin:'0 2px'}}></i>
                            </div>
                        </div>
                    </div>
                    <div className="footer-flex">
                        <Link href={`/single-property-1/${item.id}`} className="btn btn-md btn-primary fw-medium">View Detail</Link>
                    </div>
                </div>
            </div> 
        </div>
        
  )
}
