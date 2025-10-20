const GoogleApi = async () => {
  const photoUrl = `https://places.googleapis.com/v1/places/ChIJ2fzCmcW7j4AR2JzfXBBoh6E/photos/ATKogpeivkIjQ1FT7QmbeT33nBSwqLhdPvIWHfrG1WfmgrFjeZYpS_Ls7c7rj8jejN9QGzlx4GoAH0atSvUzATDrgrZic_tTEJdeITdWL-oG3TWi5HqZoLozrjTaxoAIxmROHfV5KXVcLeTdCC6kmZExSy0CLVIG3lAPIgmvUiewNf-ZHYE4-jXYwPQpWHJgqVosvZJ6KWEgowEA-qRAzNTu9VH6BPFqHakGQ7EqBAeYOiU8Dh-xIQC8FcBJiTi0xB4tr-MYXUaF0p_AqzAhJcDE6FAgLqG1s7EsME0o36w2nDRHA-IuoISBC3SIahINE3Xwq2FzEZE6TpNTFVfgTpdPhV8CGLeqrauHn2I6ePm-2hA8-87aO7aClXKJJVzlQ1dc_JuHz6Ks07d2gglw-ZQ3ibCTF5lMtCF9O-9JHyRQXsfuXw/media?maxHeightPx=400&maxWidthPx=400&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
    
  try {
    const response = await fetch(photoUrl);

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }
    console.log(response);
    
    // ✅ 이미지 응답 처리
    // 1️⃣ 방법 1: 이미지 Blob → object URL 생성 (브라우저용)
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob); // <img src={imageUrl}> 로 사용 가능

    // 또는
    // 2️⃣ 방법 2: Google API가 리다이렉트 시키는 최종 이미지 URL 사용 (더 효율적일 수 있음)
    // const imageUrl = response.url;

    console.log("✅ 가져온 이미지 URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("❌ Google API 호출 에러:", error);
    return null;
  }
};

export default GoogleApi;
