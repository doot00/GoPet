import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import axios from "axios";

const NewsList = () => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState<Article[]>([]);

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
                const response = await axios.get("https://newsapi.org/v2/everything?q=강아지+AND+페스티벌&language=ko&sortBy=publishedAt&apiKey=318fa0d4e74f43f880ad2ce0960297a5")
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

    // 아직 articles 값이 설정되지 않았을 때
    return (
        <>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </>
    )

}
export default NewsList;