import { useState } from "react"

function TodoList({data,remove,update}) {
    const [visible,setVisible]=useState(null);
    const [task,setTask]=useState("");
    return (
      <>
        <ul>
            {data.map(
            (elem,ind)=>
                <li key={ind}>
                    <span>{elem.task}</span>
                    <button style={{marginLeft:"10px"}} onClick={()=>{remove(elem.name);setVisible(null);setTask("");}}>x</button>
                    <button style={{marginLeft:"10px"}} onClick={()=>{setVisible(elem.name);setTask(elem.task);}}>Update</button> 
                    {
                        (visible==elem.name)&&(
                            <>
                                <input value={task} onChange={(e)=>setTask(e.target.value)}></input>   
                                <button onClick={()=>{
                                    if(task!==""){
                                        update(elem.name,elem.task,task);
                                        setVisible(false);
                                        setTask("");
                                    }
                                }}>Save</button>
                            </>
                        )
                    }
                </li>
            )}
        </ul>
      </>
    )
  }
  
  export default TodoList
  