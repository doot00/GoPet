import { IoSearch } from "react-icons/io5";

const ListSearch = () => {
  return (
    <div className="flex items-center border border-gray-300 p-2 rounded-md w-full max-w-md">
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        className="flex-grow outline-none px-2"
      />
      <a href="#">
        <IoSearch className="text-xl text-gray-500" />
      </a>
    </div>
  );
};

export default ListSearch;
