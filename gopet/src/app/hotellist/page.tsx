
import { GiPositionMarker } from "react-icons/gi";

const HotelList = () => {

    return (
        <>
            <div className="flex">
                <span className="flex text-xl mr-2">
                    <GiPositionMarker className="mr-2 text-2xl" /> 지 역
                </span>
            </div>
        </>
    )
}

export default HotelList;