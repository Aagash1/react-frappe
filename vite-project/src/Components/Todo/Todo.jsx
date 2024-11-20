import { useState,useEffect } from "react"
import {getTasks} from "../../Api/frappeApi.js"
import TodoList from "../TodoList/TodoList"
function Todo() {
  const [tasks,setTasks]=useState([]);
  useEffect(()=>{
    async function fetchData () {
      const data=await getTasks();
      setTasks(data);
    }
    fetchData();
  },[]);
  return (
    <>
      <TodoList data={tasks}/>
    </>
  )
}

export default Todo
