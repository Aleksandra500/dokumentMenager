import axios from 'axios'
export const uploadDocuments = async (formData) => {
  try {
    const res = await axios.post('http://localhost:5000/api/post', formData);
    return {
      status: res.data.status,
      message: res.data.message,
    };
  } catch (err) {
    console.error(err, 'error iz servisa');
    return {
      status: 'error',
      message: err.message || 'Greška pri slanju zahteva',
    };
  }
};