//This is use to import the schema we created
const Task = require("../Model/Taskmodel");


//this controller page is used to perform the CRUD operations 

/*POST METHOD
    CREATE OPERATION
*/
const createTask = (async(req, res)=>{
    try {
        //await here can only work with aysnc, without async there is no await
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})




// READ OPERATION
const getAllTask = (async(req,res)=>{
    try {
        const task = await Task.find()
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

const getSingleTaskById = (async(req,res) =>{
    try {
        const {id} = req.params
        const task = await Task.findById(id)
        res.status(200).json(task)
    if(!task){
        res.status(404).json(`no task with that id:${id}`)
    }
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

const getSingleTaskWithName = (async(req,res) =>{
    try {
        const {name} = req.params;
        const task = await Task.findOne({name:name});
        if (task) {
          res.status(200).json(task);
        } else {
          res.status(404).json({ message: 'No matching task found' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

// UPDATE OPERATION
const findOneAndUpdate = async(req,res) =>{
    try {
        const {id} = req.params;
        const task = await Task.updateOne(
            {_id:id},
            req.body,
            {
                new:true,
                runValidators:true
            }
        )
         if (task){
            res.status(200).json({ message: 'Task updated successfully' })
         }
         else{
            res.status(404).json({ message: `Task with id ${id} not found` });
         }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateTask = async(req,res) =>{
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(
            {_id:id},
            req.body,
            {
                new:true,
                runValidators:true
            }
        );
        if(!task){
            return(
                res.status(500).json(`no task found: ${id}`)
            ) 
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}


const deleteTaskById =(async(req,res)=>{
    try {
        const {id} = req.params
        const task = await Task.findByIdAndDelete(id)
        if(!task){
            return res.status(404).json(`no user with that id ${id}`)
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})




// we export our CRUD modules here so we can use them in other pages also
module.exports={createTask, getAllTask,deleteTaskById,getSingleTaskById,updateTask,findOneAndUpdate,getSingleTaskWithName}

/*  
mongoDb is a database.
mongoose serves as the middleman for communicating between nodeJs and mongoDb
insomnia is for testing, as if we are live.

This method of writing crud that we are using is called consistent status codes




Create (C):
    Model.create(): Creates a new document in the database.

Read (R):
    Model.find(): Retrieves multiple documents that match the given criteria.
    Model.findOne(): Retrieves a single document that matches the given criteria.
    Model.findById(): Retrieves a single document by its ID.

Update (U):
    Model.updateOne(): Updates a single document that matches the given criteria.
    Model.updateMany(): Updates multiple documents that match the given criteria.
    Model.findOneAndUpdate(): Finds a document and updates it.r
    Model.findByIdAndUpdate(): Finds a document by its ID and updates it.

Delete (D):
    Model.deleteOne(): Deletes a single document that matches the given criteria.
    Model.deleteMany(): Deletes multiple documents that match the given criteria.
    Model.findOneAndDelete(): Finds a document, deletes it, and returns the deleted document.
    Model.findByIdAndDelete(): Finds a document by its ID, deletes it, and returns the deleted document.
*/

