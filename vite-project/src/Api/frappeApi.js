import axios from "axios";
const API_URL="http://demo.localhost:8000/api/resource/ToDoList";
export const getTasks = async () => {
    try {
      const result= await axios.get(`${API_URL}/?fields=["task","name"]`);
      const data=result.data.data;
      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };


export const createTask=async(task)=>{
    try{
        const result= await axios.post(`${API_URL}`,{
            "task":task
        });
        const obj=result.data.data;
        return {task:obj.task,name:obj.name};
    }
    catch(error){
      console.error("Error creating task:", error);
      throw error;
    }
}


export const updateTask = async (name,oldTask,task) => {
try {
    const result= await axios.put(`${API_URL}/${name}`,{
        "task":task
    });
    return result.data.data.task;
} catch (error) {
    console.error("Error updating tasks:", error);
    throw error;
}
};


export const deleteTask= async (task) => {
try {
    const result= await axios.delete(`${API_URL}/${task}`);
    
} catch (error) {
    console.error("Error deleting tasks:", error);
    throw error;
}
};

  