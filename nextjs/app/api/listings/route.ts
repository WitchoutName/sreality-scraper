import prisma from '../../../prisma/client'
import { NextResponse } from 'next/server'
 

// get a list of all Listings
export async function GET() {
  const data = await prisma.listing.findMany();
  return NextResponse.json(data);
}

// create multiple Listings
export async function POST(request: Request) {
    const listings = await request.json();
    await prisma.listing.createMany({data: listings});
    return NextResponse.json("ok")
}