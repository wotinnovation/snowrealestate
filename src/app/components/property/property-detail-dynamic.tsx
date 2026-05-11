'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ApiProperty } from '@/app/lib/api';

const Select = dynamic(() => import('react-select'), { ssr: false })
import ModalVideo from 'react-modal-video';
import Lightbox from 'react-18-image-lightbox';

import '../../../../node_modules/react-modal-video/css/modal-video.css'
import '../../../../node_modules/react-18-image-lightbox/style.css'

export default function PropertyDetailDynamic({ property }: { property: ApiProperty }) {
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState<boolean>(true);
    const [open2, setOpen2] = useState<boolean>(true);
    const [open3, setOpen3] = useState<boolean>(true);
    const [open4, setOpen4] = useState<boolean>(false);
    const [open5, setOpen5] = useState<boolean>(false);
    const [open6, setOpen6] = useState<boolean>(false);
    const [open7, setOpen7] = useState<boolean>(true);
    const [open10, setOpen10] = useState<boolean>(true);

    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [photo, setPhoto] = useState<boolean>(false)

    const galleryImages = [property.image, ...(property.gallery || [])].filter(Boolean);

    const onImageClick = (index: number) => {
        setActiveIndex(index)
        setPhoto(true)
    }

    const ratingOptions = [
        { value: '1', label: '01 Star' },
        { value: '2', label: '02 Star' },
        { value: '3', label: '03 Star' },
        { value: '4', label: '04 Star' },
        { value: '5', label: '05 Star' },
    ]

    return (
        <>
            {/* ── Title & Price Section (from single-property-1) ── */}
            <div className="property_block_wrap style-2 p-4 mb-4">
                <div className="prt-detail-title-desc">
                    <span className={`label text-light ${property.propertyStatus === 'For Rent' ? 'bg-purple' : 'bg-success'}`}>
                        {property.propertyStatus}
                    </span>
                    <h3 className='mt-3'>{property.name}</h3>
                    <span><i className="fa-solid fa-location-dot me-2"></i> {property.address || property.location || property.neighborhood}</span>
                    <h3 className="prt-price-fix text-primary mt-2">
                        AED {property.price?.toLocaleString()}
                        {(property.propertyStatus === 'For Rent' || property.duration) && <sub>/{property.duration || 'yr'}</sub>}
                    </h3>
                    <div className="list-fx-features mt-3">
                        <div className="listing-card-info-icon">
                            <div className="inc-fleat-icon me-1"><img src='/img/bed.svg' width="13" alt="" /></div>
                            {property.bedrooms || 'Studio'} Beds
                        </div>
                        <div className="listing-card-info-icon">
                            <div className="inc-fleat-icon me-1"><img src='/img/bathtub.svg' width="13" alt="" /></div>
                            {property.bathrooms || 0} Bath
                        </div>
                        <div className="listing-card-info-icon">
                            <div className="inc-fleat-icon me-1"><img src='/img/move.svg' width="13" alt="" /></div>
                            {property.size?.toLocaleString() || 0} sqft
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Details & Features ── */}
            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link href="#" scroll={false} onClick={() => setOpen(!open)} className={open ? '' : 'collapsed'}>
                        <h4 className="property_block_title">Detail & Features</h4>
                    </Link>
                </div>
                <div id="clOne" className={`panel-collapse collapse ${open ? 'show' : ''}`}>
                    <div className="block-body">
                        <ul className="deatil_features">
                            <li><strong>Property ID:</strong>{property.propertyId}</li>
                            <li><strong>Type:</strong>{property.propertyType}</li>
                            <li><strong>Status:</strong>{property.propertyStatus}</li>
                            {property.size && <li><strong>Area:</strong>{property.size} sqft</li>}
                            {property.bedrooms !== undefined && <li><strong>Bedrooms:</strong>{property.bedrooms}</li>}
                            {property.bathrooms !== undefined && <li><strong>Bathrooms:</strong>{property.bathrooms}</li>}
                            {property.furnishing && <li><strong>Furnishing:</strong>{property.furnishing}</li>}
                            {property.developer && <li><strong>Developer:</strong>{property.developer}</li>}
                            {property.completionStatus && <li><strong>Completion:</strong>{property.completionStatus}</li>}
                            {property.yearBuilt && <li><strong>Year Built:</strong>{property.yearBuilt}</li>}
                            {property.parking !== undefined && <li><strong>Parking:</strong>{property.parking}</li>}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ── Description ── */}
            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link href="#" scroll={false} onClick={() => setOpen2(!open2)} className={open2 ? '' : 'collapsed'}>
                        <h4 className="property_block_title">Description</h4>
                    </Link>
                </div>
                <div id="clTwo" className={`panel-collapse collapse ${open2 ? 'show' : ''}`}>
                    <div className="block-body">
                        <div dangerouslySetInnerHTML={{ __html: property.description }} />
                    </div>
                </div>
            </div>

            {/* ── Amenities ── */}
            {property.amenities && property.amenities.length > 0 && (
                <div className="property_block_wrap style-2">
                    <div className="property_block_wrap_header">
                        <Link href="#" scroll={false} onClick={() => setOpen3(!open3)} className={open3 ? '' : 'collapsed'}>
                            <h4 className="property_block_title">Amenities</h4>
                        </Link>
                    </div>
                    <div id="clThree" className={`panel-collapse collapse ${open3 ? 'show' : ''}`}>
                        <div className="block-body">
                            <ul className="avl-features third color">
                                {property.amenities.map((amenity, idx) => (
                                    <li key={idx}>{amenity}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Property Video ── */}
            {property.videoTour && (
                <div className="property_block_wrap style-2">
                    <div className="property_block_wrap_header">
                        <Link href="#" scroll={false} onClick={() => setOpen4(!open4)} className={open4 ? '' : 'collapsed'}>
                            <h4 className="property_block_title">Property video</h4>
                        </Link>
                    </div>
                    <div id="clFour" className={`panel-collapse collapse ${open4 ? 'show' : ''}`}>
                        <div className="block-body">
                            <div className="property_video">
                                <div className="thumb">
                                    <Image className="pro_img img-fluid w100" src={property.image} width={0} height={0} sizes='100vw' style={{ width: '100%', height: 'auto' }} alt="Video Preview" />
                                    <div className="overlay_icon">
                                        <div className="bb-video-box">
                                            <div className="bb-video-box-inner">
                                                <div className="bb-video-box-innerup">
                                                    <Link href="#" onClick={(e) => { e.preventDefault(); setIsOpen(true); }} className="text-primary">
                                                        <i className="fa-solid fa-play"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalVideo
                        channel="youtube"
                        youtube={{ mute: 0, autoplay: 0 }}
                        isOpen={isOpen}
                        videoId={property.videoTour.split('v=')[1]?.split('&')[0] || property.videoTour.split('/').pop()}
                        onClose={() => setIsOpen(false)}
                    />
                </div>
            )}

            {/* ── Floor Plan ── */}
            {property.floorPlan && (
                <div className="property_block_wrap style-2">
                    <div className="property_block_wrap_header">
                        <Link href="#" scroll={false} onClick={() => setOpen5(!open5)} className={open5 ? '' : 'collapsed'}>
                            <h4 className="property_block_title">Floor Plan</h4>
                        </Link>
                    </div>
                    <div id="clFive" className={`panel-collapse collapse ${open5 ? 'show' : ''}`}>
                        <div className="block-body">
                            <Image src={property.floorPlan} width={0} height={0} sizes='100vw' style={{ width: '100%', height: 'auto' }} className="img-fluid" alt="Floor Plan" />
                        </div>
                    </div>
                </div>
            )}

            {/* ── Location ── */}
            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link href="#" scroll={false} onClick={() => setOpen6(!open6)} className={open6 ? '' : 'collapsed'}>
                        <h4 className="property_block_title">Location</h4>
                    </Link>
                </div>
                <div id="clSix" className={`panel-collapse collapse ${open6 ? 'show' : ''}`}>
                    <div className="block-body">
                        <div className="map-container" style={{ height: '400px' }}>
                             {/* Fallback to address if lat/lng missing */}
                             <iframe 
                                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(property.address || property.location || property.name)}`} 
                                width="100%" 
                                height="100%" 
                                style={{ border: '0' }} 
                                loading="lazy" 
                                title='property-map'
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Gallery ── */}
            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link href="#" scroll={false} onClick={() => setOpen7(!open7)} className={open7 ? '' : 'collapsed'}>
                        <h4 className="property_block_title">Gallery</h4>
                    </Link>
                </div>
                <div id="clSev" className={`panel-collapse collapse ${open7 ? 'show' : ''}`}>
                    <div className="block-body">
                        <ul className="list-gallery-inline">
                            {galleryImages.map((img, index) => (
                                <li key={index}>
                                    <Link href="#" className="mfp-gallery" onClick={(e) => { e.preventDefault(); onImageClick(index); }}>
                                        <Image src={img} width={150} height={100} style={{ objectFit: 'cover' }} className="img-fluid mx-auto rounded" alt={`Gallery ${index}`} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {photo && (
                            <Lightbox
                                mainSrc={galleryImages[activeIndex]}
                                nextSrc={galleryImages[(activeIndex + 1) % galleryImages.length]}
                                prevSrc={galleryImages[(activeIndex + galleryImages.length - 1) % galleryImages.length]}
                                onCloseRequest={() => setPhoto(false)}
                                onMovePrevRequest={() => setActiveIndex((activeIndex + galleryImages.length - 1) % galleryImages.length)}
                                onMoveNextRequest={() => setActiveIndex((activeIndex + 1) % galleryImages.length)}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* ── Write Review ── */}
            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link href="#" scroll={false} onClick={() => setOpen10(!open10)} className={open10 ? '' : 'collapsed'}>
                        <h4 className="property_block_title">Write a Review</h4>
                    </Link>
                </div>
                <div id="clTen" className={`panel-collapse collapse ${open10 ? 'show' : ''}`}>
                    <div className="block-body">
                        <form className="form-submit">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <textarea className="form-control ht-80" placeholder="Messages"></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <Select options={ratingOptions} placeholder="Choose Rating" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Your Name" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Your Email" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <button className="btn btn-primary fw-medium px-lg-5 rounded" type="submit">Submit Review</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
