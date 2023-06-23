import { NextResponse } from 'next/server'
 
export async function GET() {
  const status = {
      done: false,
      progress: 20,
      goal: 500
  }
//   const data = await JSON.stringify(stat)
 
  return NextResponse.json(status)
} 