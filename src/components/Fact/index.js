import React from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import './style.css'

import apiKey from '../../'

const Fact = () => {
    let randomFact
    const dispatch = useDispatch()

    const stateRandomFact = useSelector(state => state.random_fact)
  
      const fetchFact = async () => {
        try {
          const url = `https://api.spoonacular.com/food/trivia/random/?apiKey=${apiKey}`
          const { data } = await axios.get(url)
          randomFact = data.text
          if(randomFact.charAt(randomFact.length -1) === ".") {
            randomFact = randomFact.substring(0, randomFact.length - 1)
          }
          dispatch({ type: "SET RANDOM FACT", payload: randomFact})
        } catch (err) {
          console.log(err)
        }
      }

    if(stateRandomFact === 'no fact'){
      fetchFact()
    } else {
      randomFact = stateRandomFact
    }
  
  return (
    <>
      {stateRandomFact !== "no fact" && (
        <div className="fact">
            <p data-testid="randomFact">{randomFact}</p>
        </div>
      )}
    </>
    );
  }
  
  export default Fact;
