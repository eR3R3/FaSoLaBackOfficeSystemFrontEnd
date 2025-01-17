import {NextResponse} from "next/server";

export async function POST(req: Request){
  const createUserInfo = await req.json()
  const createdUser = await fetch("http://localhost:3001/api/users/create", {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(createUserInfo)
  }).then(async res => await res.json())
  console.log("created User:", createdUser)
  return NextResponse.json(createdUser)
}




