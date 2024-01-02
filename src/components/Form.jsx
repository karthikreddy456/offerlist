import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";

function Modalfunc({ show, onHide, addNewCard, editCard, formData }) {
  const [localFormData, setLocalFormData] = useState({
    offer: "",
    couponcode: "",
    heading: "",
    verified: false,
    noOfUsers: 0,
    getOffer: "",
    details: "",
  });

  useEffect(() => {
    if (formData) {
      setLocalFormData(formData);
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setLocalFormData({
      ...localFormData,
      [name]: inputValue,
    });
  };

  const handleSaveChanges = () => {
    if (formData) {
      // Call the function to edit the existing card
      editCard(localFormData);
    } else {
      // Call the function to add a new card
      addNewCard(localFormData);
    }

    setLocalFormData({
      offer: "",
      couponcode: "",
      heading: "",
      verified: false,
      noOfUsers: 0,
      getOffer: "",
      details: "",
    });

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="container mt-2">
          <div className="mb-2">
            <label className="form-label">Offer:</label>
            <input
              type="text"
              className="form-control"
              name="offer"
              value={localFormData.offer}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Coupon Code:</label>
            <input
              type="text"
              className="form-control"
              name="couponcode"
              value={localFormData.couponcode}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Heading:</label>
            <input
              type="text"
              className="form-control"
              name="heading"
              value={localFormData.heading}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="verified"
              value={localFormData.verified}
              onChange={handleInputChange}
              checked={localFormData.verified}
            />
            <label className="form-check-label">Verified</label>
          </div>
          <div className="mb-2">
            <label className="form-label">No. of Users:</label>
            <input
              type="number"
              className="form-control"
              name="noOfUsers"
              value={localFormData.noOfUsers}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Get Offer:</label>
            <input
              type="text"
              className="form-control"
              name="getOffer"
              value={localFormData.getOffer}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-0">
            <label
              className="form-label"
              value={localFormData.name}
              onChange={handleInputChange}
            >
              Details:
            </label>
            <textarea
              className="form-control"
              name="details"
              value={localFormData.details}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modalfunc;
