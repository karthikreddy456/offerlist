import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupForm from "./components/Signupform";
import SigninForm from "./components/Loginform";
import Cardlist from "./components/cardslist";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  function handleSignupSuccess(data) {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isUsernameExists = existingUsers.some(
      (user) => user.username === data.username
    );

    if (isUsernameExists) {
      alert("Username is already in use. Please choose a different username.");
    } else {
      const newUsers = [...existingUsers, data];
      localStorage.setItem("users", JSON.stringify(newUsers));
      // alert("Signup successful!");
    }
  }

  function handleLoginSuccess(user) {
    setAuthenticated(true);
    setUserData(user);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            authenticated ? (
              <Navigate to="/cardlist" />
            ) : (
              <SigninForm onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/signup"
          element={<SignupForm onSignupSuccess={handleSignupSuccess} />}
        />
        <Route
          path="/cardlist"
          element={
            authenticated ? (
              <Cardlist userData={userData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
