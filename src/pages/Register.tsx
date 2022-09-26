import React, { useState, useRef } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const { signup } = useAuthContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConf = passwordConfRef.current?.value;

    if (!(email && password && passwordConf)) {
      setError("all fields are required");
      return;
    }

    if (password !== passwordConf) {
      setError("your passwords are not identical");
      return;
    }
    try {
      setLoading(true);
      await signup(email, password);
      navigate("/complete");
    } catch {
      setError("something wents wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{ height: "100vh" }}
      className="container d-flex justify-content-center align-items-center"
    >
      <div className="card" style={{ width: "80%", maxWidth: "400px" }}>
        <div className="card-body  ">
          <h2 className="w-100 text-center ">Register</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="form d-flex flex-column ">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              ref={emailRef}
              required
            />

            <label className="form-label" htmlFor="password">
              password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              ref={passwordRef}
              required
            />
            <label className="form-label" htmlFor="passwordConf">
              password confirmation
            </label>
            <input
              type="password"
              id="passwordConf"
              className="form-control"
              ref={passwordConfRef}
              required
            />
            <button
              type="submit"
              className="form-control btn btn-primary mt-4"
              disabled={loading}
            >
              Register
            </button>
          </form>
        </div>
        <p className="w-100 text-center"> already have an account? <Link to='/login'>login</Link></p>
      </div>
    </div>
  );
}
