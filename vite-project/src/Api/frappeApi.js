import axios from "axios";
const API_URL="http://demo.localhost:8000/api/resource/ToDoList";
export const getTasks = async () => {
    try {
      const result= await axios.get(`${API_URL}/?fields=["task"]`);
      const data=result.data.data.map((e)=>e.task)
      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };