"use client";

import { useEffect, useState } from "react";
import { useToggleNav } from "../components/hooks/useToggleNav";
import Header from "../components/main/Header";
import NewsList from "../components/main/NewsList";
import axios from "axios";

export default function Festival() {
  const { isNavOpen, toggleNav } = useToggleNav(false);
  const [ title, setTitle ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState(true);

  // API 테스트 할 때 사용

  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?q=강아지+AND+페스티벌&language=ko&sortBy=publishedAt&apiKey=318fa0d4e74f43f880ad2ce0960297a5"
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };



  return (
    <>
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav} />
      <h1 className="text-3xl p-5">🎉 이번달 주요 축제 List</h1>
      <NewsList />
      <p>news title</p>
      {loading && <p>로딩 중...</p>}
      <div>
        {data && (
          <textarea
            rows={7}
            cols={30}
            value={JSON.stringify(data, null, 2)}
            readOnly={true}
            style={{ width: "100%", height: "500px" }}
          />
        )}
      </div>
    </>
  );
};

