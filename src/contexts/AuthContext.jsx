import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const BASE_URL = "http://localhost:8080";

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return { ...initialState };
    case "setUser":
      return { ...state, user: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const userData = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Get current time in seconds

        if (userData.exp < currentTime) {
          throw new Error("Token expired");
        }

        if (userData.userId === userId)
          dispatch({ type: "login", payload: { ...userData, token } });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, [isAuthenticated]);

  async function login(email, password) {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return "Invalid email or password";
    }

    const data = await res.json();
    const tok = jwtDecode(data.token);
    setUserId(() => tok.userId);
    localStorage.setItem("token", data.token);
    dispatch({ type: "login", payload: data });
    // window.location.reload();
    return null;
  }

  async function signUp(name, email, password) {
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error("Signup failed");

      const data = await res.json();
      dispatch({ type: "setUser", payload: data.user });
      return true;
    } catch (error) {
      console.error("Error signing up:", error);
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
