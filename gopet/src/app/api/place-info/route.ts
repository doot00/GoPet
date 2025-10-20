// app/api/place-info/route.ts
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const clientData = await request.json();
    console.log("parsed body:", clientData);
    
    // ⚠️ 클라이언트 컴포넌트가 { photoUrls: "titleString" } 형태로 보냈으므로,
    //    여기서 그 값을 'searchTitle' 변수에 할당합니다.
    const searchTitle = clientData.title?.title;

    
    if (!searchTitle) {
      return new NextResponse(JSON.stringify({ error: "No title provided" }), { status: 400 });
    }

    // 2. 추출한 title을 사용하여 Google Places API에 요청합니다.
    const googleRes = await fetch(
      `https://places.googleapis.com/v1/places:searchText?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ textQuery: searchTitle }), // ⬅️ 클라이언트가 보낸 title 사용
      }
    );
    console.log(googleRes);
    

    if (!googleRes.ok) {
        // Google API 요청 실패 시 에러 처리
        const errorData = await googleRes.json();
        console.error("Google API Error:", errorData);
        return new NextResponse(
            JSON.stringify({ error: "Google API request failed", details: errorData }), 
            { status: googleRes.status }
        );
    }
    
    const data = await googleRes.json();
    const place = data.places?.[0];
    const photos = place?.photos?.slice(0, 5) || [];

    const photoUrls = photos.map(
        (photo: any) =>
            `https://places.googleapis.com/v1/${photo.name}/media?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    );

    // 3. 사진 URL 목록과 클라이언트가 요청했던 title을 반환합니다.
    return NextResponse.json({ photoUrls, title: searchTitle });
}