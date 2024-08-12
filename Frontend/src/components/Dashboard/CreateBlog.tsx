import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import axios from "axios";
import toast from "react-hot-toast";

export interface openCard {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBlog: React.FC<openCard> = ({ setOpen }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="flex gap-4 items-center justify-center">
        <p className="text-4xl text-slate-600">Title:</p>
        <Input
          type="text"
          label=""
          onChange={(e: any) => setTitle(e.target.value)}
          placeholder="Enter Title"
        />
      </div>
      <textarea
        placeholder="Write description here..."
        onChange={(e: any) => setContent(e.target.value)}
        className="p-4 border-b border-l border-r outline-none border-gray-400 h-28 w-full"
      />
      <div className="flex gap-4">
        <h3>Public : </h3>
        <input
          type="checkbox"
          name="published"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
      </div>
      <Button label="Back to Blogs" onClick={() => setOpen(false)} />
      <Button
        label="Add Blog"
        onClick={async () => {
          try {
            const response = await axios.post(
              "https://backend.rajanmasih15.workers.dev/api/v1/blog/create-blog",
              { title, content, published },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );
            setContent("");
            setPublished(false);
            setTitle("");
            setOpen(false);
            toast.success(response.data.message);
          } catch (error: any) {
            toast.error(error.response.data.message);
          }
        }}
      />
    </div>
  );
};

export default CreateBlog;
