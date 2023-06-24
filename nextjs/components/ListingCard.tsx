import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

export interface IListingsCardProps {
    id: number
    imgUrl: string
    title: string
}

export default function ListingsCard ({id, title, imgUrl}: IListingsCardProps) {
    const [flip, setFlip] = useState(false);
    const props = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        reverse: flip,
        delay: 100,
        config: {
            tension: 216,
            friction: 25
        }
    })

    useEffect(() => {
      return () => {
        setFlip(!flip);
      };
    }, [])

  return (
    <animated.div style={props}>
    <div onClick={() => setFlip(!flip)} className="transform cursor-pointer transition h duration-500 hover:scale-110 hover:shadow-2xl  justify-center items-center">
        <img  className="h-auto max-w-full rounded-lg" src={imgUrl} alt={String(id)}/>
        <div className='absolute bg-zinc-200 bg-opacity-70 w-full  h-15 p-1 rounded-b-lg' style={{bottom: 0, height: "30%"}}>
         <p className="flex justify-center items-center h-100 text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-900 pb-10">{title}</p>
        </div>
    </div>
    </animated.div>
  );
}
