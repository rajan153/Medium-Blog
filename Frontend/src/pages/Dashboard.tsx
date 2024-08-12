import { useState } from "react";
import BlogList from "../components/Dashboard/Blog/BlogList";
import CreateBlog from "../components/Dashboard/CreateBlog";
import Login from "./Login";
import Button from "../components/common/Button";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      {token ? (
        <div>
          {open ? (
            <CreateBlog setOpen={setOpen} />
          ) : (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-center mt-4">
                <Button label="Add Blog" onClick={() => setOpen(true)} />
              </div>
              <BlogList />
            </div>
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Dashboard;
