import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('No root found!');
}

/* PROJECT PLANNING
 * What are the main containers of elements I need in this app?
    -> Header - static info
    -> A status section to show game status - win or game over
    -> A list of languages which will be updated as game is played
    -> Actual word that we're trying to guess with blank spot for every letter of the word
    -> Keyboard section - alphabet
    -> New game button at the bottom
 * What values will need to be saved in state vs. what value can be derived from the state?
    -> We need to know if game is over or not - won or lost?
    -> We need to keep track of how many wrong guesses user had as well as what the randomly selected 
    word by the game is and which letter user has already guessed
    -> 
 * How will the user interact with the app? What events do I need to handle?
    -> The main point of contact - Keyboard which will cause re-renders
    -> New game button
 */
