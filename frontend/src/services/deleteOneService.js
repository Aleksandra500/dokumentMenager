import axios from "axios";

export const deleteOne = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/post/${id}`);
   console.log(res, 'res iz servisa');
   
    return {
      success: true,
      message: res.data.message,
    };
  } catch (err) {
    console.log(err, 'error iz servisa');
    return {
      success: false,
      message: err.response?.data?.message || 'Greška na serveru',
    };
  }
};