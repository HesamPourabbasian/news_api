import axios from "axios";

const API_KEY = process.env.NEWS_API_KEY; // Use the name of your environment variable here
const BASE_URL = "https://newsapi.org/v2/";

export default async function handler(req, res) {
  const { country = "us", category = "general", pageSize = 100 } = req.query;

  try {
    const response = await axios.get(`${BASE_URL}top-headlines`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        apiKey: API_KEY, // Correctly use the environment variable
        country,
        category,
        pageSize,
      },
    });

    // Return the data to the frontend
    res.status(200).json(response.data.articles);
  } catch (error) {
    if (error.response) {
      console.error(
        `Error Response: ${error.response.status} - ${error.response.statusText}`
      );
      res.status(error.response.status).json({
        message: error.response.statusText,
        details: error.response.data,
      });
    } else if (error.request) {
      console.error("No response received:", error.request);
      res.status(500).json({ message: "No response received from the server" });
    } else {
      console.error("Error setting up request:", error.message);
      res.status(500).json({ message: "Error setting up request" });
    }
  }
}
