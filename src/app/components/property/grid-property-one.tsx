'use client'
import React, { useState, useEffect } from 'react'
import GridProperty from './grid-property';
import { getFeaturedProperties, ApiProperty } from '@/app/lib/api';

export default function GridPropertyOne({ border }: { border: any }) {
  const [properties, setProperties] = useState<ApiProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProperties(6)
      .then(data => setProperties(data))
      .catch(err => console.error('Failed to fetch properties:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="row justify-content-center g-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={i}>
            <div className="property-listing card rounded-3 border-0" style={{ minHeight: '420px' }}>
              <div className="listing-img-wrapper p-3">
                <div className="rounded-3 overflow-hidden" style={{ height: '240px', background: 'linear-gradient(135deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
              </div>
              <div className="px-3 pb-3">
                <div style={{ height: '14px', width: '60%', background: '#eee', borderRadius: '4px', marginBottom: '10px' }} />
                <div style={{ height: '18px', width: '85%', background: '#eee', borderRadius: '4px', marginBottom: '8px' }} />
                <div style={{ height: '12px', width: '70%', background: '#eee', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        ))}
        <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center py-5">
          <p className="text-muted">No featured properties available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center g-4">
      {properties.map((item, index) => (
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={item.id || index}>
          <GridProperty item={item} border={border} />
        </div>
      ))}
    </div>
  )
}
