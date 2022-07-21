import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import './style.css'
import { useNavigate } from "react-router-dom";

const UserPreferenceComponent = () => {
  const navigate = useNavigate();
  const [prefsMessageVisibility, setPrefsMessageVisibility] = useState("hidden")
  const [intoleranceList, setIntoleranceList] = useState([{ intolerance: "" }]);
  const [meals, setMeals] = useState({ breakfast: false, lunch: false, dinner: false, snack: false, dessert: false })

  const [calories, setCalories] = useState({ breakfast: 0, lunch: 0, dinner: 0, snack: 0, dessert: 0 })
  const [budget, setBudget] = useState({ breakfast: 0, lunch: 0, dinner: 0, snack: 0, dessert: 0 })
  const [diet, setDiet] = useState({ vegan: false, vegetarian: false, glutenfree: false, ketogenic: false, pescetarian: false, paleo: false })
  const [intolerance, setIntolerance] = useState([])
  const stateLoginOrRegister = useSelector(state => state.login_or_register)
  console.log(stateLoginOrRegister)

  const dispatch = useDispatch();
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...intoleranceList];
    list[index][name] = value;
    setIntoleranceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...intoleranceList];
    list.splice(index, 1);
    setIntoleranceList(list);
  };

  const handleServiceAdd = () => {
    setIntoleranceList([...intoleranceList, { intolerance: "" }]);
  };




  const handleCheckboxChange = (checkbox) => {
    const mealType = checkbox.target.name
    if (checkbox.target.checked == true) {
      setMeals({ ...meals, [mealType]: true });
      // dispatch({ type: "SET USER MEALS", payload: meals });
    } else {
      setMeals({ ...meals, [mealType]: false });
    }
  }

  // const handleCalorieChange = (e) => {
  //   const mealType = e.target.name
  //   setCalories({ ...calories, [mealType]: parseInt(e.target.value) });
  // }
  const handleBudgetChange = (e) => {
    const mealType = e.target.name
    setBudget({ ...budget, [mealType]: parseInt(e.target.value) });
  }
  let newDiet = { vegan: false, vegetarian: false, glutenfree: false, ketogenic: false, pescetarian: false, paleo: false }
  const handleRadioBtns = () => {
    const radioBtns = document.querySelectorAll('input[type = "radio"]')

    radioBtns.forEach((e) => {
      if (e.checked && e.value === "all") {
        newDiet = { vegan: false, vegetarian: false, glutenfree: false, ketogenic: false, pescetarian: false, paleo: false }
        setDiet(newDiet)
      } else {
        if (e.checked) {
          newDiet[e.value] = true
          console.log(newDiet[e.value])
          setDiet(newDiet)
        }
      }
    }
    )
  }
  let intolerances

  let prefsToBeSentToDb

  const sendPrefs = async () => {
    if (stateLoginOrRegister === "login") {
      console.log("send patch", prefsToBeSentToDb)
      const { data } = await axios.patch(`https://mealplannerserver.herokuapp.com/prefs/`, JSON.stringify(prefsToBeSentToDb))
      console.log(data)
    }
    if (stateLoginOrRegister === "register") {
      console.log("send post", prefsToBeSentToDb)
      const { data } = await axios.post(`https://mealplannerserver.herokuapp.com/createprefs/`, JSON.stringify(prefsToBeSentToDb))
      console.log(data)
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      handleRadioBtns()
      const arr = []
      for (const e of intoleranceList) {
        arr.push(e.service)
        console.log(e.service)
      }
      setIntolerance(arr)
      console.log(arr)
      arr.pop()
      console.log(arr)
      console.log(meals)
      console.log(calories)
      console.log(budget)
      console.log(newDiet)
      dispatch({ type: "SET USER INTOLERANCES", payload: intolerance });
      dispatch({ type: "SET USER DIET", payload: newDiet });
      dispatch({ type: "SET USER MEALS", payload: meals });
      dispatch({ type: "SET USER CALORIES", payload: calories });
      dispatch({ type: "SET USER BUDGETS", payload: budget });
      dispatch({ type: "SET PREFERENCES SET", payload: true })
      prefsToBeSentToDb = { prefs: { calories_limit: calories, intolorences: arr, budget: budget }, diet: newDiet, meals: meals }
      await sendPrefs()
      setPrefsMessageVisibility("visible")
    } catch (err) {
      console.log(err)
    }

  }




  return (
    <>
      <h1>Set Preferences</h1>
      <div className="preferences-box">
        <form data-testid="onsubmit" onSubmit={(e) => { onSubmit(e) }}>
          <div className="diets-section">
            <h3>Diets</h3>
            <p>I only want to recieve recipes that are:</p>
            <input type="radio" value="glutenfree" name="Diet" /> Gluten-free
            <input type="radio" value="vegetarian" name="Diet" /> Vegetarian
            <input type="radio" value="pescatarian" name="Diet" /> Pescatarian
            <input type="radio" value="vegan" name="Diet" /> Vegan
            <input type="radio" value="paleo" name="Diet" /> Paleo
            <input type="radio" value="ketogenic" name="Diet" /> Keto
            <input type="radio" value="all" name="Diet" /> Send All
          </div>

          <div className="intolorences-section">
            <h3>Intolerances</h3>
            <div>
              <label htmlFor="service">Intolerances</label>
              {intoleranceList.map((singleService, index) => (
                <div key={index} className="services">
                  <div className="first-division">
                    <input

                      spellCheck="true"
                      name="service"
                      type="text"
                      id="service"
                      value={singleService.service}
                      onChange={(e) => handleServiceChange(e, index)}
                    />
                    {intoleranceList.length - 1 === index && (
                      <button
                        type="button"
                        onClick={handleServiceAdd}
                        className="add-btn">
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                  <div className="second-division">
                    {intoleranceList.length !== 1 && (
                      <button
                        type="button"
                        onClick={() => handleServiceRemove(index)}
                        className="remove-btn">
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="meals-section">
            <h3>Meals</h3>
            <input data-testid="handleServiceChange2" type="checkbox" onChange={(e) => { handleCheckboxChange(e) }} value="Breakfast" name="breakfast" id="expand-toggle" /> Breakfast
            {/* <p className="expandable" id="p">Hi</p> */}
            <div data-testid="label2" className="toggle-section">
              <label>
                Budget(£):
                <input onChange={(e) => { handleBudgetChange(e) }} type="number" id="breakfast-budget" name="breakfast" />
              </label>
              {/* <label>
                Calories:
                <input onChange={(e) => { handleCalorieChange(e) }} type="number" id="breakfast-calories" name="breakfast" />
              </label> */}
            </div>
            <input data-testid="handleServiceChange1" type="checkbox" onChange={(e) => { handleCheckboxChange(e) }} value="Lunch" name="lunch" /> Lunch
            <div data-testid="label1" className="toggle-section">
              <label >
                Budget(£):
                <input onChange={(e) => { handleBudgetChange(e) }} type="number" id="lunch-budget" name="lunch" />
              </label>
              {/* <label>
                Calories:
                <input onChange={(e) => { handleCalorieChange(e) }} type="number" id="lunch-calories" name="lunch" />
              </label> */}
            </div>
            <input data-testid="handleServiceChange3" type="checkbox" onChange={(e) => { handleCheckboxChange(e) }} value="Dinner" name="dinner" /> Dinner
            <div data-testid="label3" className="toggle-section">
              <label>
                Budget(£):
                <input onChange={(e) => { handleBudgetChange(e) }} type="number" id="dinner-budget" name="dinner" />
              </label>
              {/* <label>
                Calories:
                <input onChange={(e) => { handleCalorieChange(e) }} type="number" id="dinner-calories" name="dinner" />
              </label> */}
            </div>
            <input data-testid="handleServiceChange4" type="checkbox" onChange={(e) => { handleCheckboxChange(e) }} value="Snacks" name="snacks" /> Snacks
            <div data-testid="label4" className="toggle-section">
              <label>
                Budget(£):
                <input onChange={(e) => { handleBudgetChange(e) }} type="number" id="snacks-budget" name="snacks" />
              </label>
              {/* <label>
                Calories:
                <input onChange={(e) => { handleCalorieChange(e) }} type="number" id="snacks-calories" name="snacks" />
              </label> */}
            </div>
            <input data-testid="handleServiceChange5" type="checkbox" onChange={(e) => { handleCheckboxChange(e) }} value="Dessert" name="dessert" /> Dessert
            <div data-testid="label5" className="toggle-section">
              <label>
                Budget(£):
                <input onChange={(e) => { handleBudgetChange(e) }} type="number" id="dessert-budget" name="dessert" />
              </label>
              {/* <label>
                Calories:
                <input onChange={(e) => { handleCalorieChange(e) }} type="number" id="dessert-calories" name="dessert" />
              </label> */}
            </div>
            <button type="submit">submit prefs</button>
          </div>
        </form>
      </div>
      <div className="preferencesConfirmed" style={{ visibility: prefsMessageVisibility }}>
        <p data-testid="p">You're preferences have been updated! Create a new meal plan <span data-testid="span" onClick={(() => navigate('/mealplan'))}>here</span></p>
      </div>
    </>
  );
}

export default UserPreferenceComponent;
