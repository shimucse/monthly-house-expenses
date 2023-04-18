import './App.css';
import { useState, useEffect } from 'react';
import Axios, * as others from 'axios';



function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);

const [foodList, setFoodList] = useState([])//show
const [newFoodName, setNewFoodName] = useState('');



  useEffect(()=> {
     
    Axios.get('http://localhost:3001/read').then((response) =>{
       setFoodList(response.data)
        console.log(response)
    })
  }, [])

  const addToList = () =>{
        Axios.post("http://localhost:3001/insert",
        {
          foodName:foodName,
          days:days,
        });
    }
    

const updateFood = (foodName)=>{
 

     Axios.put("http://localhost:3001/update",{
         
          newFoodName:newFoodName,
          foodName:foodName

      });
};
const deletedFood = (id) => {
    console.log(id)

    Axios.delete(`http://localhost:3001/delete/${id}`)
}
  return (
    <div className="App">
          <h1>CRUD App with Mearn</h1>
          <label>Food Name:</label>
          <input 
              type="text"
              onChange={(event) =>{
                setFoodName(event.target.value);
              }}
            />
          <label>Days Since You Ate It:</label>
          <input
          type="number"
          onChange={(event) =>{
            setDays(event.target.value);
          }}
          />
          <button onClick={addToList}>Add To List</button>

          

          {foodList.map((val,key)=> {


              return(

                    <div key={key} class='food'>

                          <h3 >{val.foodName}</h3><h3>{val.daysSinceIAte}</h3>

                          <input
                            type ="text"
                              placeholder='New Food Name ...'
                                onChange={(event) => {
                                 setNewFoodName(event.target.value)
                               }}
                          />

                          <button onClick={()=>updateFood(val.foodName)}>Update</button>
                          <br/>
                          <button onClick={()=>deletedFood(val._id)}>Delete</button>
                          
                    </div>

              )

          })}
         
   
    </div>
    

  );

}

export default App;
