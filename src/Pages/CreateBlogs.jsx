import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
export default function CreateBlogs() {
  const { user } = useAuthContext();
  const isMobileScreen = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const [blogtitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/blogs", {
        BlogTitle: blogtitle,
        BlogContent: blogContent,
        Author: user.user.id,
        AuthorPhotoUrl: user.user.photoUrl ,
        AuthorName: user.user.name
      })
      .then((response) => console.log(response))
      .catch((response) => console.log(response));

    navigate("/Home");
  };
  
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: isMobileScreen ? "15%" : "4%",
        }}
      >
        <h1 style={{ margin: "auto" }} className="text-body-secondary">
          Create Blog
        </h1>

        <div
          style={{
            width: isMobileScreen ? "90vw" : "55vw",
            margin: isMobileScreen ? "8% auto" : "3% auto",
          }}
          className="row"
        >
          <input
            type="text"
            className="form-control"
            id="blogTitle"
            value={blogtitle}
            style={{ marginTop: isMobileScreen ? "8%" : "3%" }}
            placeholder="Blog title"
            onChange={(e) => {
              setBlogTitle(e.target.value);
            }}
          />
        </div>

        <div
          style={{
            width: isMobileScreen ? "90vw" : "55vw",
            margin: isMobileScreen ? "6% auto" : "1% auto",
          }}
        >
          <textarea
            className="form-control "
            id="blogContent"
            value={blogContent}
            rows="10"
            placeholder="What's on your mind?"
            onChange={(e) => {
              setBlogContent(e.target.value);
            }}
          ></textarea>
        </div>

        <button
          type="button"
          style={{
            width: isMobileScreen ? "25vw" : "10vw",
            margin: isMobileScreen ? "8% auto" : " 3% auto",
          }}
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
