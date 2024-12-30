import React, {useState, useEffect} from "react";
import Todoitems from "./items";
import Add from "../Assets/images/bx-plus.svg";
import box from "../Assets/images/bx-box.svg";
import {v4 as uuidv4} from "uuid"; 


const Todoapp = () => {
  
 const [InputText, setINput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isInputVisible, setInputVisible] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null); // Track item being edited

// A greeting function based on thr current time 


 
    const [greeting, setgreeting] = useState("");
     
    useEffect(() => {
      const updateGreeting = () => {
        const currentHour = new Date().getHours();
      
        if (currentHour < 12){
          setgreeting("Good morning");
        }else if (currentHour < 18){
          setgreeting("Good Afternoon");
        }else {
          setgreeting("Good Eveening");
        }
      };
     updateGreeting();
    }, [])
    

  // render the current date and month

  function showCurrentDateAndMonth() {
    const now = new Date();
    const options = { day: 'numeric', month: 'short' }; // Format: e.g., 29 Dec
    const formattedDate = now.toLocaleDateString('en-US', options);
    return formattedDate;
  }
  

  const [Items, setItems] = useState([])

  const HandleInputClick = () => {
    setInputVisible(true);
  };
  
  function Handlechange(event){
    const Newvalue = event.target.value;
     setINput(Newvalue);
}

const addItem = () => {
  if (InputText.trim() === "") {
    setErrorMessage("Please enter a task");
  } else {
    setItems((prevItems) => [
      ...prevItems,
      { id: uuidv4(), text: InputText },
    ]);
    setINput("");
    setErrorMessage("");
    setInputVisible(false);
    setEditingItemId(null); // Reset editing state
  }
};

const deleteItem = (id) => {
  setItems((prevItems) => prevItems.filter((item) =>
    item.id !== id));
};

const handleEdit = (id, newText) => {
  setItems((prevItems) =>
    prevItems.map((item) => item.id === id ? 
    {...item, text: newText} : item)
  );
};

  
 

{
     } 
    return(
        <div className="home">
            <header className="header">
                <div className="date">{showCurrentDateAndMonth()}</div>
                <div className="greeting">
                <h1>To-Do List</h1>
                <span>{greeting}</span>
                </div>
                <div className="avatar">👻</div>
            </header>

        <div className="App">
           
          <div id="todo-list-container">
            <h2 className="heading">your tasks</h2>
            {errorMessage && (
                  <p className="error-message" style={{color: "red"}}>{errorMessage}</p>
                  )} 
             
             
             {isInputVisible && (
                   <div className="Add-input-container">
                        <input className="Add-input" 
                        onChange={Handlechange} name="input"
                        type="text" value={InputText}></input>
                      <button className="Add-btn" onClick={addItem}>
                          <span>Add</span>
                      </button>
                  </div>
                )}
                    
              
  
              {Items.length === 0 && (
        
                <div className="empty-message">
                  <img src={box} alt="" />
                  <p id="empty-message">your list is empty</p>
                  <span className="add-suggestion">Add your first task!</span>
                </div>)}
              
              <ul id="todo-list">
                {Items.map((todoItem) => 
                    (<Todoitems  key = {todoItem.id} 
                      id = {todoItem.id}
                    text = {todoItem.text}
                    onDeleted = {deleteItem}
                    onEdit = {(newText) => handleEdit(todoItem.id,
                       newText)}
                    />))}
                </ul>
                
            </div>
            </div>  
           <div className="footer-container">
             <button onClick={HandleInputClick} 
              className="floating-button">
                <img className="plus-icon" src={Add}>
                </img></button>
           </div>
               

        </div>
    )
}

export default Todoapp;