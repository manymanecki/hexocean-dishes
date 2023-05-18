import React, { Dispatch, SetStateAction } from "react";

interface ModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ setShowModal, message }) => {
  return (
    <>
      {setShowModal ? (
        <>
          <div className="modal modal-open">
            <div className="modal-box relative">
              <label
                onClick={() => setShowModal(false)}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">Server response:</h3>
              <p className="py-4 break-words">{message}</p>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
