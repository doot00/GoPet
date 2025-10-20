type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
};
const NewsItem = ({ article }: { article: Article }) => {
  const { title, description, url, urlToImage } = article;
  return (
    <div className="flex">
      {urlToImage && (
        <div className="m-10" style={{ width: "400px", height: "300px" }}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={urlToImage} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="mr-10 mt-10">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-2xl ml-10 mb-10">
            {title}
        </a>
        <p className="ml-10">{description}</p>
      </div>
    </div>
  );
};

export default NewsItem;
