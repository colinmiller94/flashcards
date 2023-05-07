import React from 'react';
import Flashcard from './Flashcard';
import './../styles/FlashcardList.css';

const FlashcardList = ({ flashcards, onDelete, onUpdate }) => {
  return (
    <div className = 'flashcard_list'>
      {flashcards.map((flashcard) => (
        <Flashcard
            key={flashcard.id}
            flashcard={flashcard}
            onDelete={onDelete}
            onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default FlashcardList;
