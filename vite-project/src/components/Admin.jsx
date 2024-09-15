import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Admin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Submit handler for the form
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check credentials
      if (
        formData.email === "admin@gmail.com" &&
        formData.password === "admin"
      ) {
        console.log("Admin login successful....!");
        navigate("/admin/dashboard");
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.log("Login failed....!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" pt-10">
        <div className="p-3 max-w-lg mx-auto rounded-2xl bg-slate-200  ">
          <h1 className="text-3xl font-semibold text-center my-7">
            Admin Login
          </h1>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="email"
              className="border p-3 rounded-lg"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              placeholder="password"
              className="border p-3 rounded-lg"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              disabled={loading}
              className="border p-3 rounded-lg bg-slate-700 uppercase text-white hover:opacity-90 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign In"}  
            </button>
          </form>
          <div className="flex gap-2 mt-5">
            <p>Go to User Signin?</p>
            <Link to="/signin">
              <span className="text-slate-700">Signin</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
