"use client";

import { useState, useEffect } from "react";
import { useToggleNav } from "../components/hooks/useToggleNav";
import { Pagination } from "swiper/modules";
import Header from "../components/main/Header";
import NewsItem from "../components/main/NewsItem";
import axios from "axios";

type Article = {
      title: string;
      description: string;
      url: string;
      urlToImage: string;
  }

export default function PetNews() {
  const { isNavOpen, toggleNav } = useToggleNav(false);
  const [ articles, setArticles] = useState<Article[]>([]);
  const [ loading, setLoading ] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?q=반려동물+OR+강아지&language=ko&sortBy=publishedAt&apiKey=318fa0d4e74f43f880ad2ce0960297a5"
      );

      // URL 기준으로 중복 제거
      const uniqueArticles = Array.from(
          new Map<string, Article>(
            response.data.articles.map((article: any) => [article.url, article])
          ).values()
        );

        setArticles(uniqueArticles);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

  fetchData();
}, []);


    if(loading) {
        return (
            <p>Loading...</p>
        )
    }
    if(!articles){
        return null;
    }


  return (
    <>
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav} />
      <h1 className="flex justify-center text-3xl p-10">🐾 반려동물 News</h1>
      
      {articles.map(article => {
       return <NewsItem key={article.url} article={article}/>
      })}

      {/* <Pagination activePage={page} itemsCountPerPage={postPerPage} totalItemsCount={길이}
      pageRangeDisplayd={5} prevPageText={"<"} nextPageText={">"} onChange={handlePageChange}/> */}

    </>
  );
};

