import React, { useState, useRef } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    

    if (!(email && password )) {
      setError("all fields are required");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      // console.log(location.state.from.pathname)
      // navigate(location.state.from.pathname|| '/');
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
          <h2 className="w-100 text-center ">Login</h2>
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
            <button
              type="submit"
              className="form-control btn btn-primary mt-4"
              disabled={loading}
            >
              Login
            </button>
          </form>
        </div>
        <p className="w-100 text-center"> don't have an account? <Link to='/register'>register</Link> now</p>
      </div>
    </div>
  );
}
