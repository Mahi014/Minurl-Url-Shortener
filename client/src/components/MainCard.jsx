import React, { useState } from "react";
import Footer from "./Footer.jsx";

const MainCard = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;
    let urlToSend = originalUrl;
    if (!/^https?:\/\//i.test(originalUrl)) {
      urlToSend = "https://" + originalUrl;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ original_url: urlToSend }),
      });
      const data = await res.json();
      setShortUrl(data.short_code || data.short_url || "");
      setCopied(false); 
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">MinURL</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter long URL"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Shorten URL
            </button>
          </form>

          {shortUrl && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-1">Short URL:</p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium break-all"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={handleCopy}
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 text-sm"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MainCard;