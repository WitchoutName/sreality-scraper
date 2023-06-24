'use client';
import Content from '@/components/Content';
import Loader from '@/components/Loader';
import Image from 'next/image'
import { useEffect, useState } from 'react';


async function getState() {
  const res = await fetch("http://localhost:8080/api/scraping-status");
  return res.json();
}

async function getListings() {
  const res = await fetch("http://localhost:8080/api/listings");
  return res.json();
}


export default function Home() {
  const [loaderData, setloaderData] = useState({
    progress: 0,
    goal: 0,
    done: false
  })
  const [listings, setlistings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloaderData(await getState());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(fetchData, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run the effect only once on mount


  useEffect(() => {
    if(loaderData.done){
      const fetchData = async () => {
        try {
            setlistings(await getListings());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [loaderData.done])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
        {!listings.length ? <Loader {...loaderData} /> : <Content listings={listings}/>}
    </main>
  )
}
