import React, { useState } from "react";

const Accordion = ({
  item,
  ondelete,
  isActive,
  onToggle,
  isEditable,
  onEditToggle,
}) => {
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Transgender", label: "Transgender" },
    { value: "Rather not say", label: "Rather not say" },
    { value: "Other", label: "Other" },
  ];

  const [inputValue, setInputValue] = useState(`${item.first} ${item.last}`);
  const [textareaValue, setTextareaValue] = useState(item.description);
  const [countryValue, setCountryValue] = useState(item.country);
  const [ageValue, setAgeValue] = useState(calculateAge(item.dob));
  const [genderValue, setGenderValue] = useState(item.gender);
  const [errorMessage, setErrorMessage] = useState("");

  const [originalInputValue, setOriginalInputValue] = useState(inputValue);
  const [originalTextareaValue, setOriginalTextareaValue] =
    useState(textareaValue);
  const [originalCountryValue, setOriginalCountryValue] =
    useState(countryValue);
  const [originalAgeValue, setOriginalAgeValue] = useState(ageValue);
  const [originalGenderValue, setOriginalGenderValue] = useState(genderValue);

  const handleEditClick = () => {
    if (isEditable) {
      if (inputValue.trim() === "" || textareaValue.trim() === "") {
        setErrorMessage("Input and textarea cannot be empty.");
        return;
      }
      setErrorMessage("");
      onEditToggle();
    } else {
      setOriginalInputValue(inputValue);
      setOriginalTextareaValue(textareaValue);
      setOriginalCountryValue(countryValue);
      setOriginalAgeValue(ageValue);
      setOriginalGenderValue(genderValue);
      onEditToggle();
    }
  };

  const handleCancelClick = () => {
    setInputValue(originalInputValue);
    setTextareaValue(originalTextareaValue);
    setCountryValue(originalCountryValue);
    setAgeValue(originalAgeValue);
    setGenderValue(originalGenderValue);
    onEditToggle();
    setErrorMessage("");
  };

  return (
    <div
      className={`accordion ${isEditable ? "isEditable" : "notEditable"}`}
      id={item.id}
    >
      <div className="accordion-item">
        <div className="accordion-title" onClick={onToggle}>
          <div className="title">
            <div className="image">
              <img src={item.picture} alt={item.first} />
            </div>
            <div className="heading">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                readOnly={!isEditable}
                required
              />
            </div>
          </div>
          <div>
            {isActive ? (
              <i className="fa-solid fa-plus"></i>
            ) : (
              <i className="fa-solid fa-minus"></i>
            )}
          </div>
        </div>
        {isActive && (
          <div className="accordion-content">
            <div className="upper-header">
              <div className="age">
                <span>Age</span>
                <input
                  type="number"
                  value={ageValue}
                  onChange={(e) => setAgeValue(e.target.value)}
                  readOnly={!isEditable}
                  required
                />
              </div>
              <div className="gender">
                <span>Gender</span>
                <select
                  value={genderValue}
                  onChange={(e) => setGenderValue(e.target.value)}
                  disabled={!isEditable}
                >
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="country">
                <span>Country</span>
                <input
                  type="text"
                  value={countryValue}
                  readOnly={!isEditable}
                  onChange={(e) => setCountryValue(e.target.value)}
                />
              </div>
            </div>
            <div className="content">
              <span>Description</span>
              <textarea
                readOnly={!isEditable}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                rows={5}
              />
            </div>
            <div className="action-btn">
              <span>
                {isEditable ? (
                  <i
                    className="fa-solid fa-xmark"
                    onClick={handleCancelClick}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => ondelete(item.id)}
                  ></i>
                )}
              </span>

              <span
                className={
                  calculateAge(item.dob) > 18 ? "editable" : "uneditable"
                }
              >
                {isEditable ? (
                  <i
                    className="fa-solid fa-check"
                    onClick={handleEditClick}
                  ></i>
                ) : (
                  <i className="fa-solid fa-pen" onClick={handleEditClick}></i>
                )}
              </span>

              {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
