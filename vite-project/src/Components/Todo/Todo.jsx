import { useState } from "react";
import { useFrappeGetDocList, useFrappeCreateDoc, useFrappeDeleteDoc, useFrappeUpdateDoc } from "frappe-react-sdk";
import TodoList from "../TodoList/TodoList";

function Todo() {
  const [task,setTask]=useState("");
  const { data: tasks, mutate: refreshTasks, loading, error } = useFrappeGetDocList("ToDoList", {
    fields: ["task", "name"],
  });
  const { createDoc } = useFrappeCreateDoc();
  const { deleteDoc } = useFrappeDeleteDoc();
  const { updateDoc } = useFrappeUpdateDoc();

  function handleChange(e){
    setTask(e.target.value);
  }

  async function handleSubmit(e){
   e.preventDefault();
   if(task!=""){
    try{
      await createDoc("ToDoList", { task });
      refreshTasks();
      setTask("");
    }
    catch(error){
      console.error("Failed to add task:", error);
    }
   }
  }
  async function handleRemoveTask(name){
    try {
      await deleteDoc("ToDoList", name);
      refreshTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  }

async function handleTaskChange(name,oldValue,value){
  try {
    await updateDoc("ToDoList", name, { task: value });
    refreshTasks();
  } catch (err) {
    console.error("Failed to update task:", err);
  }
}
  return (
    <>
      {error && <div style={{ color: "red" }}>{error.message}</div>}
      <form onSubmit={handleSubmit}>
         <input placeholder="Add Task" value={task} onChange={handleChange}></input>
         <button disabled={loading}> Add</button>
      </form>
      {loading ? <p>Loading...</p> : <TodoList data={tasks||[]} remove={handleRemoveTask} update={handleTaskChange}/>}
    </>
  )
}

export default Todo
