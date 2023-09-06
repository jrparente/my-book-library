// pages/api/fetchBook.js
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" }); // Bad Request
  }

  try {
    const baseUrl = "https://openlibrary.org/search.json";
    const url = `${baseUrl}?q=${query}`;
    const response = await fetch(url);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data" });
    }

    const data = await response.json();

    if (data.numFound > 0) {
      return res.status(200).json(data.docs); // Return all matching books
    } else {
      return res.status(404).json({ error: "No book found with this query" }); // Not Found
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" }); // Internal Server Error
  }
}
