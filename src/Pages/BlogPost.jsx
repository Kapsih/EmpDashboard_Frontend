import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMediaQuery } from "react-responsive";







export const BlogPost = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [userComment, setUserComment] = useState("");
  const userPhotoUrl = user.user.photoUrl;
  const [blog, setBlog] = useState({});
  const isMobileScreen = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const [comments, setComments] = useState([]);
  const [errors, setErrors] = useState();
  const [dummy, setDummy] = useState(true);
  const userId = user.user.id._id;
  const AuthorName = user.user.id.name;
  const AuthorPhotoUrl= user.user.id.photoUrl;

 
  useEffect(() => {
    // fetching the blogPost
    axios
      .get(`http://localhost:5000/Blogs/Blog/${id}`)
      .then((resp) => {
        // console.log(resp.data.blog)
        setBlog(resp.data.blog);
      })
      .catch((err) => {
        setErrors(err);
      });
         // fetching comments
  axios
  .get(`http://localhost:5000/comments/${id}`)
  .then((resp) => {
    setComments(resp.data.comments);
  })
  .catch((err) => {
    console.log(err);
  });
    
  }, [dummy]);

  const postComment = async () => {
    setUserComment("");
    axios
      .post("http://localhost:5000/comments/", {
        commentAuthor: userId,
        commentBody: userComment,
        blogPostId: id,
        AuthorName: AuthorName,
        AuthorPhotoUrl: AuthorPhotoUrl,
      })
      .then((resp) => {
          console.log(resp)
      })  
      .catch((err) => {
        console.log(err);
      })
     .finally(()=>{setDummy(!dummy)})
  };

 

  return (
    <>
      <div
        className="card text-white bg-dark mb-3"
        style={{
          margin: isMobileScreen?"8% auto":"3% auto",
          width:  isMobileScreen? "90vw" :"60vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
  
        }}
      >
        <div className="card-header" style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
          <img src={blog.AuthorPhotoUrl} alt="" style={{borderRadius:"50%", height:"5vh", }}/>
          <h5 style={{marginLeft:"1.5%"}}>{blog.AuthorName}</h5>
          <h4 className="card-title" style={{margin:"0 auto"}}>{blog.BlogTitle}</h4>
        </div>
        <div
          className="card-body"
          style={{
            margin: "2% auto",
            width: isMobileScreen?"100%":"80%",
          }}
        >
          <p className="card-text" style={{ width: "100%", margin:"0 auto" }}>
            {blog.BlogContent}
          </p>
        </div>
      </div>

      <form>
        <div
          style={{
            width: isMobileScreen?"90vw":"60vw",
            margin: "0% auto",
            marginTop: "4%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <textarea
            className="form-control"
            id="exampleTextarea"
            value={userComment}
            rows="4"
            onChange={(e) => {
              setUserComment(e.target.value);
            }}
          ></textarea>
          <button
            type="button"
            onClick={postComment}
            style={{ margin: isMobileScreen?"2% 0 0% 78% ":"0.5% 0 0% 90%", width: isMobileScreen? "20vw" :"5vw" }}
            className="btn btn-primary"
          >
            Post
          </button>
        </div>
      </form>

      <div
        style={{
          margin: isMobileScreen?"5% auto":"1% auto",
          width: isMobileScreen?"90vw":"60vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="exampleTextarea" className="form-label mt-3">
          Comments
        </label>

        {comments.map((comment) => {
          return (
            <div
              key={comment._id}
              className="card"
              style={{ width: isMobileScreen?"100vw":"60vw",  }}
            >
              <div className="card-body" style={{display:"flex", alignItems:"start", flexDirection:"column"}}>
                {/* <h4 className="card-title">{comment.commentAuthor}</h4> */}
                <div style={{display:"flex",flexDirection:"row", alignItems:"center"} }>
                <img src={comment.AuthorPhotoUrl} style={{height: "3vh", borderRadius:"50%"}} alt=""/>
                <h6 className="card-subtitle text-muted" style={{marginLeft:"15%"}}>
                  {comment.AuthorName}
                </h6>
                
                </div>
               
                <p className="card-text" style={{marginTop:"5px" }}>{comment.commentBody}</p>
                {/* <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
