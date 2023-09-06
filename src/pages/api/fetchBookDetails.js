// pages/api/fetchBookDetails.js
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { isbn } = req.query; // Note: We are expecting an ISBN query parameter here

  if (!isbn) {
    return res.status(400).json({ error: "ISBN is required" }); // Bad Request
  }

  try {
    const baseUrl = "https://openlibrary.org/api/books";
    const url = `${baseUrl}?bibkeys=ISBN:${isbn}&format=json&jscmd=data`; // Modified URL to use Books API
    const response = await fetch(url);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data" });
    }

    const data = await response.json();

    if (Object.keys(data).length > 0) {
      return res.status(200).json(data); // Return book details
    } else {
      return res.status(404).json({ error: "No book found with this ISBN" }); // Not Found
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" }); // Internal Server Error
  }
}
