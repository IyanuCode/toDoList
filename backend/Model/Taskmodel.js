/*this line of code below establishes a connection with the mongoose module and allows us to use its functionality
for defining schemas, models and interact with the databse*/
const mongoose = require("mongoose");

/* mongoose.schema() is a method use to define the structure or schema */
const taskSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please add your name"]
        }
    },

    {
        timestamps:true  /* timestamps add the time our data was created and time it was updated*/
    }
)

const Task = mongoose.model("Task", taskSchema)

//we export the schema so that we can import it in the controller
module.exports = Task;