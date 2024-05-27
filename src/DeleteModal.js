import React from 'react'

export default function DeleteModal(empId) {
 return(
    <div className='Modal' style={{width: "80vw", margin:"auto", marginTop:"2%"}}>
        <div className='modal-dialog' role="document">
            <div className='modal-content'>
                <div className='modal-header'>
                    <h5>Warning!</h5>
                    <button type='button' className='btn-close'  data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"></span>
                </button>
                </div>
                <div className='modal-body'>
                    <p>Do you want to delete the user?</p>
                    
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btn btn-danger'>Yes</button>
                    <button type="button" className='btn btn-light' data-bs-dismiss="modal">No</button>
                    </div>               

            </div>
        </div>
    </div>
 )
}
