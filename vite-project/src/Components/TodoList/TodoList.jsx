import { useState } from "react"

function TodoList({data,remove,update}) {
    const [visible,setVisible]=useState(false);
    const [task,setTask]=useState("");
    const [index,setIndex]=useState(null);
    return (
      <>
        <ul>
            {data.map(
            (elem,ind)=>
                <li key={ind}>
                    <span>{elem}</span>
                    <button style={{marginLeft:"10px"}} onClick={()=>{remove(ind);setVisible(false);setIndex(null);setTask("");}}>x</button>
                    <button style={{marginLeft:"10px"}} onClick={()=>{setVisible(true);setIndex(ind);setTask(elem);}}>Update</button> 
                    {
                        visible&&ind==index&&(
                            <>
                                <input value={task} onChange={(e)=>setTask(e.target.value)}></input>   
                                <button onClick={()=>{
                                    if(task!==""){
                                        update(ind,task);
                                        setVisible(false);
                                        setTask("");
                                        setIndex(null);
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
  