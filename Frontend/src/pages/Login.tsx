import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Dashboard from "../components/Dashboard";
import toast from "react-hot-toast";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  return (
    <div>
      {token ? (
        <Dashboard />
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center p-8">
          <h3 className="text-3xl font-bold">Login</h3>
          <div className="flex flex-col gap-4 p-4 border border-gray-500 rounded-lg shadow-xl">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <Button
              label="Login"
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "https://backend.rajanmasih15.workers.dev/api/v1/users/signin",
                    { email, password }
                  );
                  // console.log(response.data.message);
                  localStorage.setItem("token", response.data.jwt);
                  navigate("/dashboard");
                  toast.success("Logged In");
                } catch (error: any) {
                  toast.error(error.response.data.message);
                }
              }}
            />
            <p className="text-center text-sm">
              I have not account?{" "}
              <Link className="font-bold" to="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
