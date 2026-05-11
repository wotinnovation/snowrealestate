'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ApiProperty } from '@/app/lib/api';

export default function GridProperty({ item, border }: { item: ApiProperty; border: any }) {
  const images: string[] = [item.image, ...(item.gallery || [])].filter(Boolean);
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % images.length);
  }, [images.length]);

  // Auto-advance every 3.5s
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [next, images.length]);

  // Build price label
  const priceLabel = item.price
    ? `AED ${item.price.toLocaleString()}${item.propertyStatus === 'For Rent' || item.duration ? ` / ${item.duration || 'yr'}` : ''}`
    : 'Price on Request';

  // Display values
  const propertyStatus = item.propertyStatus || 'For Sale';
  const propertyType = item.propertyType || 'Apartment';
  const bedroomLabel = item.bedrooms ? `${item.bedrooms} Bed${item.bedrooms > 1 ? 's' : ''}` : 'Studio';
  const bathLabel = item.bathrooms ? `${item.bathrooms} Bath${item.bathrooms > 1 ? 's' : ''}` : '';
  const sizeLabel = item.size ? `${item.size.toLocaleString()} sqft` : '';

  // Use slug for URL, fallback to id
  const detailUrl = `/property/${item.slug}`;

  return (
    <div className={`property-listing card rounded-3 ${border ? 'border' : 'border-0'}`}>
      <div className="listing-img-wrapper p-3">

        {/* ── Slider ── */}
        <div
          className="list-img-slide rounded-3 overflow-hidden position-relative"
          style={{ height: '240px' }}
        >
          {images.map((src: string, i: number) => (
            <Link
              key={i}
              href={detailUrl}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === current ? 1 : 0,
                transition: 'opacity 0.6s ease',
                zIndex: i === current ? 1 : 0,
              }}
            >
              <img
                src={src}
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Link>
          ))}

          {/* Badge tags */}
          <div className="position-absolute top-0 start-0 ms-3 mt-3" style={{ zIndex: 10 }}>
            {propertyStatus === 'For Sale' && (
              <div className="label bg-success text-light d-inline-flex align-items-center justify-content-center mx-1">
                For Sale
              </div>
            )}
            {propertyStatus === 'For Rent' && (
              <div className="label bg-purple text-light d-inline-flex align-items-center justify-content-center mx-1">
                For Rent
              </div>
            )}
          </div>

          {/* Dot indicators */}
          {images.length > 1 && (
            <div
              className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-1"
              style={{ zIndex: 10 }}
            >
              {images.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); goTo(i); }}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    width: i === current ? '20px' : '7px',
                    height: '7px',
                    borderRadius: '4px',
                    border: 'none',
                    background: i === current ? '#ffffff' : 'rgba(255,255,255,0.45)',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'width 0.35s ease, background 0.35s ease',
                  }}
                />
              ))}
            </div>
          )}
        </div>
        {/* ── end slider ── */}

      </div>

      {/* ── Card body ── */}
      <div className="listing-caption-wrapper px-3">
        <div className="listing-detail-wrapper">
          <div className="listing-short-detail-wrap">
            <div className="listing-short-detail">
              <div className="d-flex align-items-center">
                {propertyStatus === 'For Rent' && <span className="label bg-light-success text-success prt-type me-2">For Rent</span>}
                {propertyStatus === 'For Sale' && <span className="label bg-light-danger  text-danger  prt-type me-2">For Sell</span>}
                <span className="label bg-light-purple text-purple property-cats">{propertyType}</span>
              </div>
              <h4 className="listing-name fw-semibold fs-5 mb-2 mt-3">
                <Link href={detailUrl}>{item.name}</Link>
              </h4>
              <div className="prt-location text-muted-2 d-flex">
                <img src='/img/svg/map-1.svg' alt="" className="me-1" />
                {item.location || item.neighborhood || item.address || ''}
              </div>
            </div>
          </div>
        </div>

        <div className="price-features-wrapper">
          <div className="list-fx-features d-flex align-items-center justify-content-between">
            <div className="listing-card d-flex align-items-center">
              <div className="square--25 text-muted-2 fs-sm circle gray-simple me-1">
                <i className="fa-solid fa-building-shield fs-xs"></i>
              </div>
              <span className="text-muted-2 fs-sm">{bedroomLabel}</span>
            </div>
            <div className="listing-card d-flex align-items-center">
              <div className="square--25 text-muted-2 fs-sm circle gray-simple me-1">
                <i className="fa-solid fa-bath fs-xs"></i>
              </div>
              <span className="text-muted-2 fs-sm">{bathLabel}</span>
            </div>
            <div className="listing-card d-flex align-items-center">
              <div className="square--25 text-muted-2 fs-sm circle gray-simple me-1">
                <i className="fa-solid fa-clone fs-xs"></i>
              </div>
              <span className="text-muted-2 fs-sm">{sizeLabel}</span>
            </div>
          </div>
        </div>

        <div className="listing-detail-footer d-flex align-items-center justify-content-between py-4">
          <div className="listing-short-detail-flex">
            <h6 className="listing-card-info-price m-0">{priceLabel}</h6>
          </div>
          <div className="footer-flex">
            <Link href={detailUrl} className="prt-view">
              <img src='/img/svg/send.svg' alt="" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
