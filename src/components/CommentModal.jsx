import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"

export default function CommentModal({showModal, handleClose, user, blogPostId,dummy, setDummy}) {
  const [comment, setComment] = useState("")
  const AuthorName = user.user.name;
  const AuthorPhotoUrl = user.user.photoUrl;
  const commentAuthor = user.user.id._id;
  const blogId = blogPostId;
 

  const postComment = async () => {
   
    axios
      .post("http://localhost:5000/comments/", {
        commentAuthor: commentAuthor,
        commentBody: comment,
        blogPostId: blogId,
        AuthorName: AuthorName,
        AuthorPhotoUrl: AuthorPhotoUrl,
      })
      .then((resp) => {
          console.log(resp)
      })  
      .catch((err) => {
        console.log(err);
      })
     .finally(()=>{
      setComment("")
      setDummy(!dummy)

      handleClose()})
  };

  return (
   
<div>
<Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{margin:"0%", padding:"2%"}}>
          <textarea style={{width:"100%",borderColor:"gray"}} rows="4"  value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={postComment}>
            Post Comment
          </Button>
        </Modal.Footer>
      </Modal>

</div>
  )
}
