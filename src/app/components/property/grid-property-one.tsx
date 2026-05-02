import React from 'react'

import { snowProperties } from '@/app/data/snow-properties';

import GridProperty from './grid-property';

import { SnowProperty } from '@/app/data/snow-properties';

export default function GridPropertyOne({border}:{border:any}) {
  return (
    <div className="row justify-content-center g-4">
        {snowProperties.slice(0,6).map((item:SnowProperty,index:number)=>{
            return(
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={index}>
                    <GridProperty item={item} border={border}/>
                </div>
            )
        })}
    </div>
  )
}
