// pages/api/fetchGoogleBooks.js
export default async function handler(req, res) {
  // if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
  //   return res.status(401).send("You are not authorized to call this API.");
  // }

  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" }); // Bad Request
  }

  try {
    const baseUrl = "https://www.googleapis.com/books/v1/volumes";
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const url = `${baseUrl}?q=${query}&key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch from Google Books API: ${response.statusText}`,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: `An error occurred: ${error}` }); // Internal Server Error
  }
}
