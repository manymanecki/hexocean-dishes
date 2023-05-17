import React from "react";

interface ModalProps {
  showModal: boolean;
}

const Modal: React.FC<ModalProps> = ({ showModal }) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="modal modal-open">
            <div className="modal-box relative">
              <label className="btn btn-sm btn-circle absolute right-2 top-2">
                ✕
              </label>
              <h3 className="text-lg font-bold">
                Congratulations random Internet user!
              </h3>
              <p className="py-4">
                You've been selected for a chance to get one year of
                subscription to use Wikipedia for free!
              </p>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
