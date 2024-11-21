import { useState,useEffect } from "react";
import {getTasks,createTask,deleteTask,updateTask} from "../../Api/frappeApi.js"
import TodoList from "../TodoList/TodoList";

function Todo() {
  const [task,setTask]=useState("");
  const [tasks,setTasks]=useState([]);
  const [error, setError] = useState("");

  useEffect(()=>{
    async function fetchData () {
      try{
        const data=await getTasks();
        setTasks(data);
      }
      catch(error){
        setError("Failed to load tasks.");
      }
    }
    fetchData();
  },[]);

  function handleChange(e){
    setTask(e.target.value);
  }

  async function handleSubmit(e){
   e.preventDefault();
   if(task!=""){
    try{
      const newTask= await createTask(task);
      setTasks((prev)=>[...prev,newTask]);
      setTask("");
    }
    catch(error){
      setError("Failed to add task.");
    }
   }
  }
  async function handleRemoveTask(name){
    try{
      await deleteTask(name);
      setTasks((prev) => prev.filter((task) => task.name !== name));
    }
    catch(err){
      setError("Failed to delete task.");
    }
  }

async function handleTaskChange(name,oldValue,value){
  try{
    await updateTask(name,oldValue,value);
    setTasks((prev)=>prev.map((e)=>{
      if(e.name==name)return {name,task:value};
      return e; 
    }))
  }
  catch(err){
    setError("Failed to update task.");
  }
}
  return (
    <>
       {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
         <input placeholder="Add Task" value={task} onChange={handleChange}></input>
         <button> Add</button>
      </form>
      <TodoList data={tasks} remove={handleRemoveTask} update={handleTaskChange}/>
    </>
  )
}

export default Todo
