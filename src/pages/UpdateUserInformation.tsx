import React, { useRef, useState } from "react";
import { Card, useAccordionButton } from "react-bootstrap";
import { BsPersonBoundingBox } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useUsersContext } from "../contexts/UsersContext";
import { uploadFile } from "../utils/uploadFile";
import { Avatar } from "@mui/material";

export default function UpdateUserInformation() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, updateUsernameAndPhotoURL } = useAuthContext();
  const { updateUser } = useUsersContext();
  const photoRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const disableNextButton = !Boolean(user?.displayName) || loading;
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setError("");
    e.preventDefault();
    const photo = photoRef.current?.files?.[0];
    const username = usernameRef.current?.value;
    if (!username) {
      setError("username is required");
      return;
    }
    try {
      setLoading(true);
      const photoURL = photo && user && (await uploadFile(photo, user.uid));
      await updateUsernameAndPhotoURL(username, photoURL);
      // console.log(user)
      if (user) {
        updateUser(user);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
      if (typeof error === "string") {
        setError(error);
      } else {
        setError("something went wrong");
      }
    } finally {
      setLoading(false);
      usernameRef.current.value = "";
      if (photo) photoRef.current.value = "";
    }

    // console.log(user);
  }
  return (
    <div
      style={{ height: "100vh" }}
      className="container d-flex justify-content-center align-items-center"
    >
      <Card style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h4 className="w-100 text-center">
            complete your account information
          </h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="avatar" className="form-label w-100 text-center">
              <h6> add avatar</h6>
              {user?.photoURL ? (
                <Avatar
                  src={user.photoURL}
                  alt={user.displayName || "avatar"}
                  sx={{
                    width: "200px",
                    height: "200px",
                    cursor: "pointer",
                    borderRadius: "50%",
                    margin:'auto'
                  }}
                />
              ) : (
                <BsPersonBoundingBox
                  style={{ width: "200px", height: "200px", cursor: "pointer" }}
                />
              )}
            </label>
            <input
              type={"file"}
              id="avatar"
              className="form-control"
              style={{ display: "none" }}
              ref={photoRef}
            ></input>
            <label htmlFor="displayName" className="from-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              ref={usernameRef}
              placeholder={user?.displayName || ""}
              required
            />
            <button
              className="btn btn-primary mt-3 form-control"
              disabled={loading}
            >
              submit
            </button>
            <button
              className="btn btn-success form-control mt-3"
              disabled={disableNextButton}
              onClick={() => navigate("/")}
            >
              Next
            </button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
