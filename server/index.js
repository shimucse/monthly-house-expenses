const express = require ('express');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')

const FoodModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://user:UserPass123@crud.hxylqxu.mongodb.net/?retryWrites=true&w=majority", 
{
    useNewUrlParser:true
}
);

app.post('/insert',async(req,res)=>{

    const foodName = req.body.foodName
    const days = req.body.days

    const food = new FoodModel({foodName:foodName, daysSinceIAte:days});
    try{
        await food.save();
        res.send("inserted data") 
      
      
    }catch(err){
        console.log(err)
    }
} );
app.put('/update',async(req,res)=>{


    const newFoodName = req.body.newFoodName;    
    const foodName = req.body.foodName;

    

    try{
        
        const doc = await FoodModel.findOneAndUpdate({foodName:foodName},{foodName:newFoodName},
            {
                new:true
            });
       

    }catch(err){
        console.log(err)
    }


} );


app.get('/read',async(req,res)=>{


        let data = await FoodModel.find();
        res.send(data)

    }
 );
 app.delete('/delete/:id',async(req,res)=>{


    const id = req.params.id;
    console.log(id);
    await FoodModel.findByIdAndRemove(id).exec();
    console.log("deleted")

}
);
app.listen(3001, ()=> {
    console.log('Server running on port 3001');
});


