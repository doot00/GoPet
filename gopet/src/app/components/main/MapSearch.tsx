import { useState } from "react";
import { IoSearch } from "react-icons/io5";

interface MapSearchProps {
    onSearch: (address: string) => void;
}

const MapSearch = ({ onSearch }: MapSearchProps) => {
    const [address, setAddress] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(address.trim()) {
            onSearch(address);
        }
    }

    return (
        <div className="flex items-center border border-gray-300 p-2 rounded-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="주소를 입력해주세요."
            className="flex-grow outline-none px-2"
        />
        <button type="submit" className="text-xl text-gray-500">
            <IoSearch  />
        </button>
        </form>
        </div>
    );
};

export default MapSearch;
