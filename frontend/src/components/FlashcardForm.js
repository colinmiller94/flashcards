import React, { useState } from 'react';

const FlashcardForm = ({ addFlashcard }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addFlashcard(front, back);
    setFront('');
    setBack('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Front side"
        value={front}
        onChange={(e) => setFront(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Back side"
        value={back}
        onChange={(e) => setBack(e.target.value)}
        required
      />
      <button type="submit">Add Flashcard</button>
    </form>
  );
};

export default FlashcardForm;
