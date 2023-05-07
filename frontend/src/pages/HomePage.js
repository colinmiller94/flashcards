import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'

import FlashcardForm from '../components/FlashcardForm'
import FlashcardList from '../components/FlashcardList'
import jwtDecode from 'jwt-decode'


const HomePage = () => {
    let {authTokens, logoutUser} = useContext(AuthContext)
    let [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
      fetchFlashcards();
    }, []);

    // 
    const fetchFlashcards = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/flashcards/', {
      headers: {
        Authorization: `Bearer ${String(authTokens.access)}`,
      }
      });
      setFlashcards(response.data);
    };

    const addFlashcard = async (front, back) => {
      const config = {
        headers: {
          Authorization: `Bearer ${String(authTokens.access)}`,
        },
      };
    
      const decodedToken = jwtDecode(authTokens.access);
      const userId = decodedToken.user_id;
    
      const data = { front, back, user: userId };
    
      const response = await axios.post(
        "http://127.0.0.1:8000/api/flashcards/",
        data,
        config
      );
      setFlashcards([...flashcards, response.data]);
      
    };

    
    const updateFlashcard = async (id, front, back) => {
      const config = {
        headers: {
          Authorization: `Bearer ${String(authTokens.access)}`,
        }
      };

      const decodedToken = jwtDecode(authTokens.access);
      const userId = decodedToken.user_id;
    
      const data = { front, back, user: userId };

      const response = await axios.put(`http://127.0.0.1:8000/api/flashcards/${id}/`, data, config);
      setFlashcards(
        flashcards.map((flashcard) =>
          flashcard.id === id ? { ...response.data } : flashcard
        )
      );
    };


    const deleteFlashcard = async (id) => {
      await axios.delete(`http://127.0.0.1:8000/api/flashcards/${id}/`, {
    headers: {
      Authorization: `Bearer ${String(authTokens.access)}`,
    }},);
      setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
    };



    // 

    return (
        <div className="App">
        <FlashcardForm addFlashcard={addFlashcard} />
        <FlashcardList
          flashcards={flashcards}
          onDelete={deleteFlashcard}
          onUpdate={updateFlashcard}
        />
      </div>
        
    )
}

export default HomePage


