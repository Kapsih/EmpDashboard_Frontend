import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { TfiCommentAlt } from "react-icons/tfi";
import CommentModal from "../components/CommentModal";
import { useAuthContext } from "../hooks/useAuthContext";

const fetchComments = (setComments) => {
  axios
    .get(`http://localhost:5000/comments/`)
    .then((resp) => {
      setComments(resp.data.comments);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const Blogs = () => {
  const [showModal, setShowModal] = useState(false)
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [dummy, setDummy] = useState(false)
  const [blogPostId, setBlogPostId] = useState("")
  const {user} = useAuthContext()
  const isMobileScreen = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/blogs/")
      .then((resp) => {
        setBlogs(resp.data.blogs);
      });
    } catch (error) {
        console.log(error)
    }
fetchComments(setComments)
  }, [dummy]);
  
  const handleClose = () => {
    setShowModal(false)};
  
  // const handleShow = () => setShowModal("modal");
const openCommentModal = (blogPostId)=>{
      setBlogPostId(blogPostId)
      setShowModal(true)
      
}


  return (
    <div>
    <CommentModal showModal={showModal} handleClose={handleClose} user={user} blogPostId={blogPostId} dummy={dummy} setDummy={setDummy}/>
    
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
                index % 2 === 0
                  ? "card text-white bg-dark"
                  : "card bg-light "
              }
              style={{
                margin: isMobileScreen ? "0 auto" : "0 auto",
                marginTop: isMobileScreen?"8%":"3%",
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
                  style={{ borderRadius: "50%", height: "5vh" }}
                />
                <h6 style={{ marginLeft: "1.5%" }}>{blog.AuthorName}</h6>
                <h4 className="card-title" style={{ margin: "0 auto" }}>
                  {blog.BlogTitle}
                </h4>
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
              <div style={{display:"flex", justifyContent:"end", marginRight:"5%", marginBottom:"1.5%", cursor:"pointer"}}>
              
              <button type="button" className="btn btn-primary" onClick={()=>{openCommentModal(blog._id)}}>
              <TfiCommentAlt size={20} />
              </button>
              </div>
              
        
            </div>
            <div className="commentBox" style={{display:"flex", justifyContent:"center"}}>
                <textarea id={blog._id} style={{width: isMobileScreen ? "90vw" : "60vw", borderRadius:"5px", display:(showCommentBox)?"block":"none"}} rows="4" ></textarea>
              </div>
           
            {comments.map((comment)=>{
                    if(comment.blogPostId === blog._id){
                       return (<div key={comment._id} style={{background:"beige" , width: isMobileScreen ? "90vw" : "60vw", margin: isMobileScreen?"1% auto":"7px auto", borderRadius:"10px"}}>
                                <div style={{display:"flex", marginLeft:isMobileScreen?"5%":"1.5%", marginTop:isMobileScreen?"2%":"1%"}}>
                                    <img src={comment.AuthorPhotoUrl}  style={{ borderRadius: "50%", height: "3vh" }}/>
                                    <p style={{marginLeft:"1%"}}>{comment.AuthorName}</p>
                                </div>
                                <div style={{marginLeft:"5%"}}>
                                    <p>{comment.commentBody}</p>
                                </div>
                        </div>
                       )
                    }
                })}
        
          </div>
        );
      })}

    </div>
  );
};
