const Workout = require('../models/workoutModel');
const mongoose = require('mongoose')
//get all workouts

const getAllWorkouts = async(req,res)=>{
  const workouts = await Workout.find({}).sort({createdAt: -1})
  res.status(200).json(workouts)
}

//get a single workout


const getWorkout = async(req,res)=>{
  const {id}=req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No Such Workout'})
  }

  const workout = await Workout.findById(id)

  if(!workout){
    return res.status(404).json({error: ' No such workout'})
  }

  res.status(200).json(workout)
}
//create new workout
const createWorkout = async(req,res)=> {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message }); // Fixed typo from `eror` to `error`
  }
}
// delete a workout
const deleteWorkout = async (req, res)=>{
  const {id}=req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such workout'})
  }
  const workout = await Workout.findOneAndDelete({_id : id})
  if (!workout){
    res.status(404).json({error:'no such a workout'})
  }
  res.status(200).json(workout)
}
//update a workout
const updateWorkout = async(req,res)=>{
  const {id}=req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'no such a workout'})
  }
  const workout = await Workout.findOneAndUpdate({_id:id},{...req.body})
  
  if(!workout){
    return res.status(404).json({error:'no such a workout'})
  }
  res.status(200).json(workout)
}
module.exports={
  createWorkout,getWorkout,getAllWorkouts,deleteWorkout,updateWorkout
}