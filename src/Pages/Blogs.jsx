import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { TfiCommentAlt } from "react-icons/tfi";
import CommentModal from "../components/CommentModal";
import { useAuthContext } from "../hooks/useAuthContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import Form from "react-bootstrap/Form";
import TextEditor from "../components/TextEditor";
import { useSearchParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import PaginationLocal from "../components/Pagination";

const fetchComments = (setComments, user) => {
  axios
    .get(`http://localhost:5000/comments/`, {
      headers: { Authorization: "Bearer " + user.token },
    })
    .then((resp) => {
      setComments(resp.data.comments);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Blogs = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    Author: "All",
    order: "desc",
    page: "1",
  });
  const [showModal, setShowModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [paginationData, setPaginationData] = useState({
    totalPages: "1",
    currentPage: "1",
  });
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState("1");
  const [dummy, setDummy] = useState(false);
  const [blogPostId, setBlogPostId] = useState("");
  const { user } = useAuthContext();
  const [showComments, setShowComments] = useState({ state: false, id: null });
  const [authors, setAuthors] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const isMobileScreen = useMediaQuery({
    query: "(max-width: 768px)",
  });
  dayjs.extend(relativeTime);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    let author = searchParams.get("Author");
    let order = searchParams.get("order");
    let limit = searchParams.get("limit")
    try {
      const resp = await axios.get(
        `http://localhost:5000/blogs/?Author=${author}&order=${order}&limit=${limit}&page=${currentPage}`,
        {
          headers: { Authorization: "Bearer " + user.token },
        }
      );

      setPaginationData({
        ...paginationData,
        totalPages: resp.data.totalPage,
        currentPage: resp.data.currentPage,
      });
      setBlogs(resp.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let author = searchParams.get("Author") || "All";
    let order = searchParams.get("order") || "desc";
    let limit = searchParams.get("limit") || "3";

    try {
      axios
        .get(`http://localhost:5000/blogs/authors`, {
          headers: { Authorization: "Bearer " + user.token },
        })
        .then((resp) => {
          setAuthors(resp.data.authors);
        });
    } catch (error) {
      console.log(error);
    }
    try {
      axios
        .get(`http://localhost:5000/blogs/?Author=${author}&order=${order}&limit=${limit}&page=${currentPage}`, {
          headers: { Authorization: "Bearer " + user.token },
        })
        .then((resp) => {
          setPaginationData({
            ...paginationData,
            totalPages: resp.data.totalPage,
            currentPage: resp.data.currentPage,
          });

          setBlogs(resp.data.blogs);
        });
    } catch (error) {
      console.log(error);
    }
    fetchComments(setComments, user);
  }, [dummy, fetchData]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDropdownChange = (e) => {
    console.log(e.target.name)
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(e.target.name, e.target.value);
      return newParams;
    });
  };

  // const handleShow = () => setShowModal("modal");
  const openCommentModal = (blogPostId) => {
    setBlogPostId(blogPostId);
    setShowModal(true);
  };
  const handleOrderChange = (e) => {
    setSearchParams((prev) => {
      prev.set("order", e.target.value);
      return prev;
    });
  };
  

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="sorting-filtering-bar"
        style={{
          // display: "flex",
          // flexDirection: "row",
          // justifyContent: "start",
          margin: "1% 0% 0% 2%",
        }}
      >
        <form style={{ display: "flex", flexDirection: "row"}}>
          <div style={{display:"flex", flexDirection:"column", paddingTop:"10px"}}>
          <Form.Select
          name="Author"
          size="sm"
          onChange={handleDropdownChange}
          style={{ width: "8vw", marginTop:"0.5%" }}
          aria-label="Author selection dropdown"
        >
         
          <option value="all" >All</option>

          {authors.map((author, index) => {
            return (
            <option  key={index} value={author}>
                {author}{" "}
              </option>
            );
          })}
        </Form.Select>
        <Form.Select
        name="limit"
        size="sm"
        onChange={handleDropdownChange}
        style={{ width: "8vw", marginTop:"0.5%" }}
        aria-label="Limit selection dropdown"
      >
        <option   value="3">3</option>
        <option   value="5">5</option>
      </Form.Select>
          </div>

            <div style={{display:"flex", marginLeft:"1%" ,flexDirection:"column"}}>
            <div
            style={{
              // display: "flex",
              width:"6.5vw",
              // flexDirection:"row",
             
              paddingTop:"15px"
             
            }}
          >
            <Form.Check
              // inline
              name="sortingOrder"
              type="radio"
              id={"desc"}
              value="desc"
              onChange={handleOrderChange}
              label="Latest"
              
            />
            <Form.Check
              // inline
              name="sortingOrder"
              type="radio"
              id={"asc"}
              value="asc"
              onChange={handleOrderChange}
              label="Oldest"
              
            />
          </div>

        

            </div>
            <div>
            <button
            style={{width:"6vw", marginTop:"12px", borderRadius:"8px"}}
            className="btn btn-primary"
            onClick={handleSubmit}
            type="button"
          >
            Search
          </button>
            </div>
        
        </form>
      </div>
      
      <hr />

      <div style={{ display: "flex", flexDirection: "column"}}>
        <div className="editor" style={{ width: "70%", margin: "1% auto" }}>
          {/* <TextEditor /> */}
        </div>

        <CommentModal
          showModal={showModal}
          handleClose={handleClose}
          user={user}
          blogPostId={blogPostId}
          dummy={dummy}
          setDummy={setDummy}
        />

        {blogs.map((blog, index) => {
          return (
            <div
              key={blog._id}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                className={
                  index % 2 === 0 ? "card text-white bg-dark" : "card bg-light "
                }
                style={{
                  margin: isMobileScreen ? "0 auto" : "0 auto",
                  marginTop: isMobileScreen ? "8%" : "3%",
                  marginBottom: isMobileScreen ? "1%" : "0%",
                  width: isMobileScreen ? "90vw" : "60vw",
                }}
              >
                <div
                  className="card-header"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={blog.AuthorPhotoUrl}
                    alt=""
                    style={{ borderRadius: "50%", height: "3vh" }}
                  />
                  <p
                    style={{
                      paddingLeft: "1%",
                      paddingTop: "1%",
                      fontSize: "15px",
                    }}
                  >
                    {blog.AuthorName}
                  </p>
                  <h5 className="card-title" style={{ margin: "0 auto" }}>
                    {blog.BlogTitle}
                  </h5>
                  <p key={blog._id} style={{ fontSize: "12px" }}>
                    {dayjs(blog.createdAt).fromNow()}
                  </p>
                </div>
                <div
                  className="card-body"
                  style={{
                    margin: "2% auto",
                    width: isMobileScreen ? "100%" : "80%",
                  }}
                >
                  <p
                    className="card-text"
                    style={{ width: "100%", margin: "0 auto" }}
                  >
                    {blog.BlogContent}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    marginBottom: "2%",
                    cursor: "pointer",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    type="button"
                    style={{ marginLeft: "5%" }}
                    className="btn btn-primary"
                    id={blog._id}
                    onClick={(e) => {
                      setShowComments({
                        id: e.target.id,
                        state: !showComments.state,
                      });
                    }}
                  >
                    <TfiCommentAlt
                      id={blog._id}
                      onClick={(e) => {
                        setShowComments({
                          id: e.target.id,
                          state: !showComments.state,
                        });
                      }}
                      size={20}
                    />
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginRight: "5%" }}
                    onClick={() => {
                      openCommentModal(blog._id);
                    }}
                  >
                    Comment
                  </button>
                </div>
              </div>

              {showComments.state &&
                comments.map((comment) => {
                  if (
                    comment.blogPostId === blog._id &&
                    showComments.id === blog._id
                  ) {
                    return (
                      <div
                        key={comment._id}
                        style={{
                          background: "beige",
                          width: isMobileScreen ? "90vw" : "60vw",
                          margin: isMobileScreen ? "1% auto" : "7px auto",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: isMobileScreen ? "5%" : "1.5%",
                            marginTop: isMobileScreen ? "2%" : "1%",
                          }}
                        >
                          <img
                            src={comment.AuthorPhotoUrl}
                            style={{ borderRadius: "50%", height: "3vh" }}
                          />
                          <p style={{ marginLeft: "1%", flex: "2" }}>
                            {comment.AuthorName}
                          </p>

                          <p
                            style={{
                              fontSize: "12px",
                              marginRight: "5px",
                            }}
                            key={comment._id}
                          >
                            {dayjs(comment.createdAt).fromNow()}
                          </p>
                        </div>

                        <div style={{ marginLeft: "5%" }}>
                          <p>{comment.commentBody}</p>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          );
        })}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1%" }}
      >
        <PaginationLocal
          totalPages={paginationData.totalPages}
          currentPage={paginationData.currentPage}
          style={{ height: "3vh" }}
          setSearchParams={setSearchParams}
          handleSubmit={handleSubmit}
          searchParams={searchParams}
          fetchData={fetchData}
          setFetchData={setFetchData}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
