import prisma from '../../../prisma/client'
import { NextResponse } from 'next/server'
import { env } from 'process';
import { getStatus, setStatus } from '@/prisma/scrapingStatus';
 

export async function GET() {
    const status = await getStatus()
    const count = await prisma.listing.count();
    const data = {
        done: status == "done",
        progress: count,
        goal: env.SC_TARGET_NUMBER
    }

    return NextResponse.json(data);
}


export async function POST(request: Request) {
    await setStatus(await request.text());
    return NextResponse.json("ok");
}