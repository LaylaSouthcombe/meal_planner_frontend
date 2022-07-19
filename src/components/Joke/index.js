import React, { useEffect, useState } from "react";
import axios from 'axios';

const Joke = () => {
    const [joke, setJoke] = useState([]);
  
    useEffect(() => {
  
      const fetchJoke = async () => {
        try {
          const url = `https://api.spoonacular.com/food/jokes/random/?apiKey=4a85ed324bd749eba71cf53e82e1c84d`
  
          const { data } = await axios.get(url)
          console.log(data.text)
          setJoke(data.text)
        } catch (err) {
          console.log(err)
        }
      }
      fetchJoke()
    }, [])


  
    return (
      <div className="joke">
        {/* <header className="App-header"> */}
          <p> {joke} </p>
        {/* </header> */}
      </div>
    );
  }
  
  export default Joke;
