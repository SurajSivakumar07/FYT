import React, { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const quotes = [
  "Push yourself, because no one else is going to do it for you.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The only bad workout is the one you didn’t do.",
  "Train insane or remain the same.",
  "Don't limit your challenges, challenge your limits.",
  "Sweat now, shine later.",
];

export default function QuoteCard() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const random = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[random]);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-4xl mx-auto mt-4 flex items-start gap-3">
      <FaQuoteLeft className="text-indigo-500 text-xl mt-1" />
      <p className="text-sm text-gray-700 italic">{quote}</p>
    </div>
  );
}
