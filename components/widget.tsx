"use client";

import ReactTimeago from "react-timeago";

const news = [
  {
    title: "How to Learn TypeScript in 2024",
    createdAt: new Date("2024-07-05T10:00:00Z"),
    readers: 150,
  },
  {
    title: "Trends in Web Development",
    createdAt: new Date("2024-07-04T08:30:00Z"),
    readers: 300,
  },
  {
    title: "Best Practices in UI/UX",
    createdAt: new Date("2024-07-02T14:15:00Z"),
    readers: 120,
  },
  {
    title: "Complete Guide to Docker for Beginners",
    createdAt: new Date("2024-06-28T09:00:00Z"),
    readers: 500,
  },
  {
    title: "Introduction to Machine Learning",
    createdAt: new Date("2024-06-20T16:45:00Z"),
    readers: 250,
  },
];

export const Widget = () => {
  return (
    <div className="ml-6 border rounded-md bg-white py-3 px-5 flex flex-col">
      <h1 className="text-xl font-semibold mb-2">LinkedIn News</h1>
      <h2 className="font-semibold text-gray-700/60 mb-2">Top stories</h2>
      {news.map(({ title, createdAt, readers }, i) => (
        <div key={i} className="py-1.5">
          <p className="text-sm font-semibold truncate">{title}</p>
          <p className="text-xs text-gray-700/80">
            <ReactTimeago date={createdAt} /> • {readers} readers
          </p>
        </div>
      ))}
    </div>
  );
};
