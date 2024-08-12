import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root");

const ConfirmationModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 600px;
  background: #ffffff;
  width: 90%;
  padding: 20px;
  font-family: "Poppins", sans-serif;
  border: 1px solid #b3b3b9;
  border-radius: 16px;
  z-index: 3;
  .action-btns {
    display: flex;
    justify-content: end;
    gap: 16px;
    button {
      padding: 10px 25px;
      border-radius: 10px;
      background: #ffffff;
      border: 1px solid #b3b3b9;
      font-family: "Poppins", sans-serif;
      cursor: pointer;
      &.delete {
        background: red;
        color: #ffffff;
        border-color: red;
      }
    }
  }
`;

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <ConfirmationModalStyle>
        <p>{message}</p>
        <div className="action-btns">
          <button onClick={onRequestClose}>Cancel</button>
          <button onClick={onConfirm} className="delete">
            Delete
          </button>
        </div>
      </ConfirmationModalStyle>
    </Modal>
  );
};

export default ConfirmationModal;
