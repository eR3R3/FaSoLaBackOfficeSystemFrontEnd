import {NextResponse} from "next/server";

export async function POST(req: Request) {
  const createClubInfo = await req.json()
  console.log(createClubInfo)
  const res = await fetch('http://localhost:3001/api/clubs/create', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(createClubInfo)
  }).then(async (res) => await res.json())
  console.log(res)
  return NextResponse.json(res)
}