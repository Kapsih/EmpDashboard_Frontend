import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteModal({setShowDeleteModal, showDeleteModal, handleDelete, empId}) {

  return (
    <>
      

      <Modal
        show={showDeleteModal}
        onHide={()=>{setShowDeleteModal(false)}}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You're about to delete a user! 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setShowDeleteModal(false)}}>
            Close
          </Button>
          <Button onClick={()=>{handleDelete(empId)}} variant="danger">Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
