import React, { useEffect, useState } from "react";
import { fetchTopHeadlines } from "./newsService";

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all"); // Default category set to "all"
  const [page, setPage] = useState(1);

  // Fetch news articles based on category
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // If category is "all", fetch news without category
        const news = await fetchTopHeadlines(
          "us",
          category === "all" ? "" : category,
          20 // Number of articles to fetch
        );
        setArticles(news);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, page]); // Fetch news when category or page changes

  const loadMoreArticles = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number to fetch more articles
  };

  if (loading) return <div className="text-center p-4 text-lg">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Top Headlines
      </h1>

      {/* Category Selector */}
      <div className="text-center mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-[10px] py-2 rounded-lg "
        >
          <option value="all">All</option>
          <option value="technology">Technology</option>
          <option value="science">Science</option>
          <option value="politics">Politics</option>
        </select>
      </div>

      {/* News Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300"
          >
            {article.urlToImage && (
              <img
                className="w-full h-56 object-cover"
                src={article.urlToImage}
                alt={article.title}
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 truncate">
                {article.title}
              </h2>
              <p className="text-gray-700 mt-2 line-clamp-3">
                {article.description}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
