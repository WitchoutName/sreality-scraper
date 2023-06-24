import * as React from 'react';

interface Listing {
    id: number,
    title: string,
    imgUrl: string
}

export interface IContentProps {
    listings: Array<Listing>
}

export default function Content ({listings}: IContentProps) {    
  const data = listings.map(l=>
    <div className="transform  transition h duration-500 hover:scale-110 hover:shadow-2xl  justify-center items-center">
        <img className="h-auto max-w-full rounded-lg" src={l.imgUrl} alt={String(l.id)}/>
        <div className='absolute bg-zinc-200 bg-opacity-70 w-full  h-15 p-1 rounded-b-lg' style={{bottom: 0, height: "30%"}}>
         <p className=" flex justify-center items-center h-100 text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-900 pb-10">{l.title}</p>
        </div>
    </div>
  )
  
  return (
    <div>
        <h1 className="text-center font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-900 pb-10">Flats, flats everywhere!</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 container">
            {data}
        </div>
    </div>
  );
}
