import {NextResponse} from "next/server";

export async function POST (req: Request) {
  const clubName: Record<string, any> = await req.json()
  const club = await fetch('http://localhost:3001/api/clubs/findClub', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(clubName),
  }).then(async (res) => await res.json())
  console.log(club)
  return NextResponse.json(club)
}