import React from "react";
// import ReactDOM from 'react-dom/client';
import { Joke } from '../../components';
import { Fact } from '../../components';
import { RandomRecipe } from '../../components';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import homepageHero from '../../images/homepageHero.jpg'
import homepageMeal from '../../images/homepageMeal.jpg'

import './style.css'

const Homepage = () => {
  const state = useSelector((state) => state.user_state);
  const navigate = useNavigate();
  console.log('state on homepage is' + state)
  return (
    <>
    <h1>Sooki</h1>
      <div className="logoArea">
        <div className="hompageImg">
          <img src={homepageHero} alt=""/>
          <div className="homeImgOverlay">0</div>
        </div>
      </div>
      <div className="featuresSection">
        <div className="featuresText">
        <p>Features:</p>
        <ul className="features">
          <li>Set budget</li>
          <li>Save favourites</li>
          <li>Generate shopping list</li>
        </ul>
        </div>
        <div className="loginSignup" data-testid="navLog" onClick={() => navigate('/login')}>
          <p>Sign up or</p>
          <p>log in</p>
        </div>
      </div>
      <div className="recipeOfDay">
        <RandomRecipe />
      </div>
      <div className="hompageInstructionsDiv">
        <p>How to get your meal plan</p>
        <ul className="hompageInstructions">
          <li className="hompageInstructionsImg"><img src="" alt="" />preferences (will have image)</li>
          <li className="hompageInstructionsImg"><img src={homepageMeal} alt="" /></li>
          <li className="hompageInstructionsImg"><img src="" alt="" />shopping list (will have image)</li>
          <li className="hompageInstructionsStep"> 1. Set preferences</li>
          <li className="hompageInstructionsStep">2. Generate and select meals</li>
          <li className="hompageInstructionsStep">3. Create shopping list</li>
        </ul>
      </div>
      <div className="randomFact">
        <p>Fact of the Day</p>
        <Fact />
      </div>
    </>
  )

};



export default Homepage;
