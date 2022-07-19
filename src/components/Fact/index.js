import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";

import apiKey from '../../'

const Fact = () => {
  
    let randomFact
    const dispatch = useDispatch()

    const stateRandomFact = useSelector(state => state.random_fact)
  
      const fetchFact = async () => {
        try {
          const url = `https://api.spoonacular.com/food/trivia/random/?apiKey=${apiKey}`
  
          const { data } = await axios.get(url)
          console.log(data.text)
          // setFact(data.text)
          randomFact = data.text
          dispatch({ type: "SET RANDOM FACT", payload: data.text})
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
        {/* <header className="App-header"> */}
          <p> {randomFact} </p>
        {/* </header> */}
      </div>
    )}
    </>
    );
  }
  
  export default Fact;
