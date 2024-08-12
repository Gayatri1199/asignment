import React, { useState, useEffect } from "react";
import Accordion from "./Components/Accordion";
import data from "./celebrities";
import ConfirmationModal from "./Components/ConfirmationModal";
import styled from "styled-components";

const MainStyle = styled.div`
  font-family: "Poppins", sans-serif;
  position: relative;
  padding: 15px;
  input,
  textarea,
  select {
    border: none;
    width: 100%;
    font-family: "Poppins", sans-serif;
    resize: none;
    &::placeholder {
      font-family: "Poppins", sans-serif;
    }
  }
  select {
    &:disabled {
      color: #000;
      opacity: 1;
    }
  }
  .search-bar {
    padding: 15px;
    max-width: 600px;
    width: 90%;
    margin: 20px auto;
    display: flex;
    align-items: center;
    border: 1px solid #b3b3b9;
    border-radius: 16px;
    input {
      &:focus {
        outline: none;
      }
    }

    i {
      margin-right: 8px;
      color: #b3b3b9;
    }
  }

  .accordion {
    max-width: 600px;
    margin: auto;
    margin-bottom: 16px;
    border: 1px solid #b3b3b9;
    border-radius: 16px;
    padding: 10px 20px;

    input,
    select,
    textarea {
      border: 1px solid transparent;
      border-radius: 10px;
    }

    &.isEditable {
      input,
      select,
      textarea {
        border-color: #b3b3b9;
      }
    }

    .upper-header {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      .age,
      .gender,
      .country {
        max-width: 30%;
        width: 100%;
        input,
        select {
          width: 90%;
        }
      }

      input,
      select,
      textarea {
        padding: 10px;
      }
    }

    .accordion-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      .title {
        display: flex;
        align-items: center;
        gap: 16px;
        .heading {
          font-weight: bold;
        }
        .image {
          width: 72px;
          height: 72px;
          border-radius: 100px;
          overflow: hidden;
          img {
            display: block;
          }
        }
      }
    }
  }

  .content {
    margin-top: 20px;
    textarea {
      margin-top: 10px;
    }
  }
  .action-btn {
    text-align: right;
    span {
      margin-right: 8px;
      cursor: pointer;
      &.uneditable {
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }

  .error {
    background: #efb7b7;
    padding: 10px;
    color: red;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
  }
  .search-wrapper {
    top: 0px;
    padding: 10px;
    position: sticky;
    background: #fff;
  }
  .fa-trash,
  .fa-check {
    color: #ff0000;
  }
  .fa-pen {
    color: #006dff;
  }
  .fa-xmark {
    color: green;
  }
`;

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [updatedata, setUpdatedata] = useState(data);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [activeAccordionId, setActiveAccordionId] = useState(null);
  const [editableAccordionId, setEditableAccordionId] = useState(null);

  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.first.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUpdatedata(filteredData);
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (item) => {
    setItemToDelete(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      const updatedItems = updatedata.filter(
        (item) => item.id !== itemToDelete.id
      );
      setUpdatedata(updatedItems);
    }
    closeModal();
  };

  const handleToggleAccordion = (id) => {
    if (activeAccordionId === id) {
      setActiveAccordionId(null);
      setEditableAccordionId(null);
    } else {
      setActiveAccordionId(id);
      setEditableAccordionId(null);
    }
  };

  const handleEditToggle = (id) => {
    setEditableAccordionId(editableAccordionId === id ? null : id);
  };

  return (
    <MainStyle>
      <div className="search-wrapper">
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder={"Search User"}
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      </div>

      {updatedata?.map((item) => (
        <Accordion
          item={item}
          key={item.id}
          ondelete={() => openModal(item)}
          isActive={activeAccordionId === item.id}
          onToggle={() => handleToggleAccordion(item.id)}
          isEditable={editableAccordionId === item.id}
          onEditToggle={() => handleEditToggle(item.id)}
        />
      ))}

      <ConfirmationModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this item?"
      />
    </MainStyle>
  );
};

export default Main;
