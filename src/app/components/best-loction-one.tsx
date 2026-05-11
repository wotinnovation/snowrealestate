"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { getCommunities, ApiCommunity } from '../lib/api';

export default function BestLoctionOne() {
    const [communities, setCommunities] = useState<ApiCommunity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await getCommunities();
                const filtered = data.filter(c => (c.propertyCount || 0) > 0).slice(0, 8);
                setCommunities(filtered);
            } catch (err) {
                console.error("Error loading communities:", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) {
        return (
            <div className="row justify-content-center">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="location-property-wrap rounded-4 p-2" style={{ opacity: 0.5 }}>
                            <div style={{ width: '100%', height: '220px', background: '#EDEDED', borderRadius: '10px' }} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="row justify-content-center g-xl-4 g-md-3 g-4">
            {communities.map((item, index) => {
                return (
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6" key={index}>
                        <div className="location-property-wrap rounded-4 p-2">
                            <div className="location-property-thumb rounded-4">
                                <Link href={`/properties/location/${item.slug}`}><img src={item.image || '/image/placeholder.jpg'} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '10px' }} className="img-fluid" alt={item.name} /></Link>
                            </div>
                            <div className="location-property-content">
                                <div className="lp-content-flex">
                                    <h4 className="lp-content-title">{item.name}</h4>
                                    <span className="text-muted-2">{item.propertyCount} {item.propertyCount === 1 ? 'Property' : 'Properties'}</span>
                                </div>
                                <div className="lp-content-right">
                                    <Link href={`/properties/location/${item.slug}`} className="text-primary">
                                        <span className="svg-icon svg-icon-2hx">
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
                                                <path d="M11.9343 12.5657L9.53696 14.963C9.22669 15.2733 9.18488 15.7619 9.43792 16.1204C9.7616 16.5789 10.4211 16.6334 10.8156 16.2342L14.3054 12.7029C14.6903 12.3134 14.6903 11.6866 14.3054 11.2971L10.8156 7.76582C10.4211 7.3666 9.7616 7.42107 9.43792 7.87962C9.18488 8.23809 9.22669 8.72669 9.53696 9.03696L11.9343 11.4343C12.2467 11.7467 12.2467 12.2533 11.9343 12.5657Z" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
