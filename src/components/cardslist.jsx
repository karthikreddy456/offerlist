import React, { useState, useEffect } from "react";
import Card from "./card";
import CardForm from "./Cardform";

function Cardlist({ userData }) {
  const [cardList, setCardList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); //For editing purpose

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  // Load initial card list from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setCardList(storedData);
  }, []);

  const addNewCard = (newCard) => {
    const updatedCardList = [...cardList, newCard];
    localStorage.setItem("formData", JSON.stringify(updatedCardList));
    setCardList(updatedCardList);
    handleCloseForm();
  };

  const handleEdit = (card) => {
    setSelectedCard(card);
    handleShowForm();
  };

  const handleEditCard = (updatedCard) => {
    const updatedCardList = cardList.map((card) =>
      card.offer === selectedCard.offer ? updatedCard : card
    );

    localStorage.setItem("formData", JSON.stringify(updatedCardList));
    setCardList(updatedCardList);
    handleCloseForm();
  };

  const handleDelete = (offer) => {
    const updatedCardList = cardList.filter((card) => card.offer !== offer);
    localStorage.setItem("formData", JSON.stringify(updatedCardList));
    setCardList(updatedCardList);
  };

  return (
    <>
      {cardList.map((card, index) => (
        <Card
          key={index}
          data={card}
          onEdit={() => handleEdit(card)}
          onDelete={handleDelete}
        />
      ))}
      {userData && userData.username === "admin@gmail.com" && (
        <div>
          <button
            className="btn btn-primary mt-2"
            variant="primary"
            onClick={handleShowForm}
          >
            Add
          </button>
          <hr />
        </div>
      )}
      <CardForm
        show={showForm}
        onHide={handleCloseForm}
        onSave={selectedCard ? handleEditCard : addNewCard}
        formData={selectedCard}
      />
    </>
  );
}

export default Cardlist;
