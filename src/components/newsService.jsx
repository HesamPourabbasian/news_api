import axios from "axios";

const API_KEY = "117a0ef7ed72451dabb2153b9e7ad332";
const BASE_URL = "https://newsapi.org/v2/";

export const fetchTopHeadlines = async (
  country = "us",
  category = "general",
  pageSize = 100
) => {
  try {
    const response = await axios.get(`${BASE_URL}top-headlines`, {
      params: {
        apiKey: API_KEY,
        country,
        category,
        pageSize, // increase the number of articles per request
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
