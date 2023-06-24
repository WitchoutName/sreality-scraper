import * as React from 'react';
import { useState } from 'react';
import ListingsCard from './ListingCard';
import Pagination from './Pagination';

interface Listing {
    id: number,
    title: string,
    imgUrl: string
}

export interface IContentProps {
    listings: Array<Listing>
}

export default function Content ({listings}: IContentProps) {  
    const [items, setItems] = useState<Array<Listing>>([]);
    // const [items, setitems] = useState<Array<Listing>>([]);
    
  const data = items.map(item => <ListingsCard key={item.id} id={item.id} title={item.title} imgUrl={item.imgUrl} /> )
  
  return (
    <div className='w-full'>
        <h1 className="text-center font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-900 pb-10">Flats, flats everywhere!</h1>
        <Pagination rest={{ className: "px-20" }} setItems={setItems} items={listings} perPage={40} />
        <div style={{"minHeight": "1000px"}}>
            <div className="grid grid-cols-2 mx-auto my-0 md:grid-cols-3 lg:grid-cols-4 gap-7 container ">
                {data}
            </div>
        </div>
    </div>
  );
}
