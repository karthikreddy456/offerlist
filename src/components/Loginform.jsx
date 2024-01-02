import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

function SigninForm({ onLoginSuccess, SignupSuccessMessage }) {
  const [username, setUsername] = useState(""); // Updated variable name
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "", // Updated variable name
    password: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  function handleSubmit() {
    if (username.trim() === "") {
      setErrors((errors) => ({ ...errors, username: "Enter username" })); // Updated variable name
    } else {
      setErrors((errors) => ({ ...errors, username: "" })); // Updated variable name
    }

    if (password.trim() === "") {
      setErrors((errors) => ({ ...errors, password: "Enter valid password" }));
    } else {
      setErrors((errors) => ({ ...errors, password: "" }));
    }

    // Check if username and password match stored user data
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password // Updated variable name
    );

    if (user) {
      //   alert("Login successful!");
      onLoginSuccess(user);
    } else {
      alert("Login failed. Check your username and password."); // Updated message
    }
  }

  return (
    <div className="border mt-5 m-auto p-4 widthl">
      <h2 className="text-primary text-center">Login Form</h2>
      <div className="mt-3">
        <label>Username</label> {/* Updated label */}
        <input
          type="text" // Updated input type
          name="username" // Updated input name
          className="input-field form1"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Updated function call
        />
        {errors.username && (
          <span className="text-danger">{errors.username}</span>
        )}
      </div>
      <div className="mt-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="input-field form1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <span className="text-danger">{errors.password}</span>
        )}
      </div>
      <div className="mt-3">
        <button
          className="btn btn-primary w-100"
          onClick={() => {
            handleSubmit();
          }}
        >
          Login
        </button>
      </div>
      <div>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default SigninForm;
