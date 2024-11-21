import { useState,useEffect } from "react";
import {getTasks,createTask,deleteTask,updateTask} from "../../Api/frappeApi.js"

import TodoList from "../TodoList/TodoList"
function Todo() {
  const [task,setTask]=useState("");
  const [tasks,setTasks]=useState([]);
  useEffect(()=>{
    async function fetchData () {
      const data=await getTasks();
      setTasks(data);
    }
    fetchData();
  },[]);

  function handleChange(e){
    setTask(e.target.value);
  }

  async function handleSubmit(e){
   e.preventDefault();
   if(task!=""){
    const newTask= await createTask(task);
    setTasks((prev)=>[...prev,newTask]);
    setTask("");
   }
}
async function handleRemoveTask(elem){
  await deleteTask(elem);
  setTasks((prev)=>prev.filter((e)=>e.name!=elem));
}

async function handleTaskChange(name,oldValue,value){
  await updateTask(name,oldValue,value);
  setTasks((prev)=>prev.map((e)=>{
     if(e.name==name)return {name,task:value};
     return e; 
  }))
}
  return (
    <>
      <form onSubmit={handleSubmit}>
         <input placeholder="Add Task" value={task} onChange={handleChange}></input>
         <button> Add</button>
      </form>
      <TodoList data={tasks} remove={handleRemoveTask} update={handleTaskChange}/>
    </>
  )
}

export default Todo
