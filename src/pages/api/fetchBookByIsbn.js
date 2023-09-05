// api/fetchBookByIsbn.js

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { isbn } = req.query;

  if (!isbn) {
    return res.status(400).json({ error: "ISBN is required" }); // Bad Request
  }

  try {
    const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data" });
    }

    const data = await response.json();

    if (data.totalItems > 0) {
      const book = data.items[0].volumeInfo;
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ error: "No book found with this ISBN" }); // Not Found
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" }); // Internal Server Error
  }
}
