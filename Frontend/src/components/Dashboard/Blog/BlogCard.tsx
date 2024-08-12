import { getBlogData } from "./BlogList";

interface blogCardData {
  newData: getBlogData;
}

const BlogCard: React.FC<blogCardData> = ({ newData }) => {
  return (
    <div className="flex flex-col gap-2 border border-gray-900 rounded-lg p-4 shadow-lg items-start justify-evenly">
      <h2 className="font-bold font-mono text-2xl">{newData.title}</h2>
      <p className="font-sans text-sm ">{newData.content}</p>
      <p className="font-light">
        Status:{" "}
        <span className="font-medium">
          {newData?.published === true ? "Public" : "Private"}
        </span>
      </p>
    </div>
  );
};

export default BlogCard;
