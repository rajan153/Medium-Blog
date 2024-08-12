import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

export interface getBlogData {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: {
    name: string;
  };
}

function BlogList() {
  const [data, setData] = useState<getBlogData[]>([]);

  const fetchBlog = async () => {
    const response = await axios.get(
      "https://backend.rajanmasih15.workers.dev/api/v1/blog/bulk",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setData(response.data.response);
  };

  useEffect(() => {
    fetchBlog();
  }, [setData]);

  return (
    <div>
      {data.length === 0 ? (
        <h2>No Blog Here</h2>
      ) : (
        <div className="p-8 flex flex-col gap-4">
          {data.map((newData: getBlogData) => (
            <BlogCard key={newData.id} newData={newData} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogList;
