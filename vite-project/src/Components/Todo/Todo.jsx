import { useState } from "react"
import TodoList from "../TodoList/TodoList"
function Todo() {
  const [task,setTask]=useState("");
  const [tasks,setTasks]=useState([]);
  function handleChange(e){
      setTask(e.target.value);
  }
  function handleSubmit(e){
     e.preventDefault();
     if(task!="")
     setTasks((prev)=>[...prev,task]);
     setTask("");
  }
  function handleTaskChange(index,value){
    setTasks((prev)=>prev.map((e,ind)=>{
       if(ind==index)return value;
       return e; 
    }))
  }

  function handleRemoveTask(index){
    setTasks((prev)=>prev.filter((e,ind)=>ind!=index));
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
