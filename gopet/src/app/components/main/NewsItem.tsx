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
        <div className="mb-10" style={{ width: "400px", height: "400px" }}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={urlToImage} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="mt-5">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-2xl mb-20">
            {title}
        </a>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default NewsItem;
