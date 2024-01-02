import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

function SignupForm({ onSignupSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  function validateForm() {
    let formIsValid = true;

    // Email format validation for username
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setErrors((errors) => ({
        ...errors,
        username: "Enter a valid email address",
      }));
      formIsValid = false;
    } else {
      setErrors((errors) => ({ ...errors, username: "" }));
    }

    if (password.trim() === "") {
      setErrors((errors) => ({ ...errors, password: "Enter password" }));
      formIsValid = false;
    } else {
      setErrors((errors) => ({ ...errors, password: "" }));
    }

    if (confirmPassword.trim() === "") {
      setErrors((errors) => ({
        ...errors,
        confirmPassword: "Confirm password is required",
      }));
      formIsValid = false;
    } else if (password !== confirmPassword) {
      setErrors((errors) => ({
        ...errors,
        confirmPassword: "Passwords do not match",
      }));
      formIsValid = false;
    } else {
      setErrors((errors) => ({ ...errors, confirmPassword: "" }));
    }

    return formIsValid;
  }

  function handleSubmit() {
    if (validateForm()) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const isUsernameExists = existingUsers.some(
        (user) => user.username === username
      );

      if (isUsernameExists) {
        alert(
          "Username is already in use. Please choose a different username."
        );
      } else {
        const newUser = { username, password };
        const newUsers = [...existingUsers, newUser];
        localStorage.setItem("users", JSON.stringify(newUsers));
        alert("Signup successful!");
        navigate("/login");
      }
    }
  }

  return (
    <div className="border mt-5 m-auto p-4 widthl">
      <h2 className="text-primary text-center">Signup Form</h2>
      <div className="mt-3">
        <label>Username (Email)</label>
        <input
          type="text"
          name="username"
          className="input-field form1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="input-field form1"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <span className="text-danger">{errors.confirmPassword}</span>
        )}
      </div>
      <div className="mt-3">
        <button
          className="btn btn-primary w-100"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
      <p className="text-center mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignupForm;
