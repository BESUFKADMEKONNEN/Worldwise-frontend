import { useState } from "react";
import styles from "./Signup.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  function validateForm(field, value) {
    let newErrors = { ...errors };

    if (field === "name") {
      if (!value.trim()) newErrors.name = "Name is required";
      else if (value.trim().length < 5)
        newErrors.name = "Name should be at least 5 characters long";
      else delete newErrors.name;
    }

    if (field === "email") {
      if (!value.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value))
        newErrors.email = "Enter a valid email address";
      else delete newErrors.email;
    }

    if (field === "password") {
      if (!value.trim()) newErrors.password = "Password is required";
      else if (value.length < 5)
        newErrors.password = "Password should be at least 5 characters long";
      else delete newErrors.password;
    }

    if (field === "confirmPassword") {
      if (!value.trim())
        newErrors.confirmPassword = "Confirm password is required";
      else if (value !== password)
        newErrors.confirmPassword = "Passwords don't match";
      else delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  }

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission

    const validationErrors = {};
    validateForm("name", name);
    validateForm("email", email);
    validateForm("password", password);
    validateForm("confirmPassword", confirmPassword);

    const isSignedUp = await signUp(name, email, password);
    if (isSignedUp) {
      navigate("/login");
    } else {
      alert("Sign-up failed. Please try again.");
    }
  }

  return (
    <main className={styles.signup}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            onChange={(e) => {
              setName(e.target.value);
              validateForm("name", e.target.value);
            }}
            value={name}
            className={errors.name ? styles.errorBorder : ""}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email"
            onChange={(e) => {
              setEmail(e.target.value);
              validateForm("email", e.target.value);
            }}
            value={email}
            className={errors.email ? styles.errorBorder : ""}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            onChange={(e) => {
              setPassword(e.target.value);
              validateForm("password", e.target.value);
            }}
            value={password}
            className={errors.password ? styles.errorBorder : ""}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        <div className={styles.row}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateForm("confirmPassword", e.target.value);
            }}
            value={confirmPassword}
            className={errors.confirmPassword ? styles.errorBorder : ""}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}
        </div>

        <div>
          <Button type="secondary-btn">Signup</Button>
        </div>
      </form>
    </main>
  );
}
