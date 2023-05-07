import React, { useState } from 'react';
import './../styles/Flashcard.css';

const Flashcard = ({ flashcard, onDelete, onUpdate }) => {
  const [showBack, setShowBack] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedFront, setEditedFront] = useState(flashcard.front);
  const [editedBack, setEditedBack] = useState(flashcard.back);

  const handleClick = () => {
    if (!editing) {
      setShowBack(!showBack);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onUpdate(flashcard.id, editedFront, editedBack);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(flashcard.id);
  };

  return (
    <div className="flashcard" onClick={handleClick}>
      {editing ? (
        <>
          <input
            className="front-input"
            type="text"
            value={editedFront}
            onChange={(e) => setEditedFront(e.target.value)}
          />
          <input
            className="back-input"
            type="text"
            value={editedBack}
            onChange={(e) => setEditedBack(e.target.value)}
          />
          <div className="actions">
            <button onClick={handleSave}>Save</button>
          </div>
        </>
      ) : (
        <>
          {showBack ? (
            <div className="back">{flashcard.back}</div>
          ) : (
            <div className="front">{flashcard.front}</div>
          )}
        </>
      )}
      {!editing && (
        <div className="actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
