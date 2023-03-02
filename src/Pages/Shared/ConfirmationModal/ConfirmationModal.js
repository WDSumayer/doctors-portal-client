import React from 'react';

const ConfirmationModal = ({title, setDeletingDoctor, modalData, successAction}) => {

    const closeModal = () => {
        setDeletingDoctor(null)
    }
    return (
        <div>
            {/* The button to open modal */}


{/* Put this part before </body> tag */}
<input type="checkbox" id="confirmation-modal" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Are you sure you want to delete doctor <span className='text-red-700'>{title}</span></h3>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <div className="modal-action">
      <label onClick={() => successAction(modalData)} htmlFor="confirmation-modal" className="btn btn-primary">Delete</label>
      <button onClick={closeModal} className='btn btn-danger'>Cancel</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default ConfirmationModal;