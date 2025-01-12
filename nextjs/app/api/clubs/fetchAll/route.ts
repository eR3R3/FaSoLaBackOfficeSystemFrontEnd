import {NextResponse} from "next/server";

export async function GET() {
  const allClubs = await fetch('http://localhost:3001/api/clubs/fetchAll', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
  return NextResponse.json(allClubs)
}