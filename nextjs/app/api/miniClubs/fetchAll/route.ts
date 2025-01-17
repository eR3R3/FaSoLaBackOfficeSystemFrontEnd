import {NextResponse} from "next/server";

export async function GET(){
    const res = await fetch("http://localhost:3001/api/miniClubs/fetchAll", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }).then(async res=> await res.json())
    return NextResponse.json(res)
}