"use client";

import { useState, useEffect } from "react";
import { useToggleNav } from "../components/hooks/useToggleNav";
import Header from "../components/main/Header";
import NewsItem from "../components/main/NewsItem";
import axios from "axios";

export default function PetNews() {
  const { isNavOpen, toggleNav } = useToggleNav(false);
  const [ articles, setArticles] = useState<Article[]>([]);
  const [ loading, setLoading ] = useState(true);

  type Article = {
        title: string;
        description: string;
        url: string;
        urlToImage: string;
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://newsapi.org/v2/everything?q=반려동물+OR+강아지&language=ko&sortBy=publishedAt&apiKey=318fa0d4e74f43f880ad2ce0960297a5")
                setArticles(response.data.articles);                
            } catch(e) {
                console.log(e);
            }
            setLoading(false);
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
      <h1 className="text-3xl p-5">🐾 반려동물 News</h1>
      
      {articles.map(article => {
       return <NewsItem key={article.url} article={article}/>
      })}
    </>
  );
};

