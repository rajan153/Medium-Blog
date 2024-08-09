import { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-8">
      <h3 className="text-3xl font-bold">Sign Up</h3>
      <div className="flex flex-col gap-4 p-4 border border-gray-500 rounded-lg shadow-xl">
        <Input
          label="Name"
          placeholder="Enter your name"
          type="text"
          onChange={(e: any) => setName(e.target.value)}
        />
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
        <Input
          label="Confirm Password"
          placeholder="Enter your confirm password"
          type="text"
          onChange={(e: any) => setConfirmPassword(e.target.value)}
        />
        <Button
          label="Sign up"
          onClick={async () => {
            try {
              if (password != confirmPassword) {
                toast.error("Password not match");
              }
              const response = await axios.post(
                "https://backend.rajanmasih15.workers.dev/api/v1/users/signup",
                { name, email, password }
              );
              navigate("/login");
              toast.success(response.data.message);
            } catch (error: any) {
              console.log(error.response);

              toast.error(error.response.data.message);
            }
          }}
        />
        <p className="text-center text-sm">
          I have account.{" "}
          <Link className="font-bold" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
