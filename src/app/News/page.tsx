"use client";

import { latestNews } from "@/lib/actions";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState<any[]>([]);
  const [hoveredNews, setHoveredNews] = useState<Number | null>(null);

  const fetchNewsData = async () => {
    const newsLocal = localStorage.getItem("news");
    const timestamp = localStorage.getItem("newsTimestamp");
    const oneHour = 60 * 60 * 1000;

    if (newsLocal && timestamp && Date.now() - parseInt(timestamp) < oneHour) {
      setNews(JSON.parse(newsLocal));
    } else {
      const newsData = await latestNews();
      setNews(newsData);
      console.log("Fetching News Data");
      localStorage.setItem("news", JSON.stringify(newsData));
      localStorage.setItem("newsTimestamp", Date.now().toString());
    }
  };

  useEffect(() => {
    fetchNewsData();
    const interval = setInterval(fetchNewsData, 60 * 60 * 1000); // Fetch data every hour

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div>
      <div className="bg-blue-300 flex flex-col gap-8">
        <div className="text-3xl shadow-2xl p-10">News</div>
        <div className="flex flex-col gap-6 overflow-y-scroll scrollbar-hide p-10">
          {news.map((news, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-2xl cursor-pointer  group"
              onClick={() => window.open(news.url, "_blank")}
              // onMouseEnter={()=> setHoveredNews(index)}
              // onMouseLeave={()=> setHoveredNews(null)}
            >
              <h1 className="text-xl font-bold"> {news.title}</h1>
              <p className="">{news.content}</p>
              {/* {hoveredNews == index && news.urlToImage && ( */}
                {/* <div className="w-1/3 h-1/3">
                  <Image src={news.urlToImage} alt={news.title} height={400} width={400} className= "max-w-full max-h-full" />
                </div> */}
              {/* )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
