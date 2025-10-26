
interface HotelRegionPageProps {
    params: {region: string };
}

export default function HotelRegionPage({params}: HotelRegionPageProps) {
    const { region } = params;

    return (
        <div>
            <h1>{region.toUpperCase()} 지역 숙박 리스트 </h1>

        </div>
    )
}

// 페이지를 만든다. 조회할 수 있는 ? 
