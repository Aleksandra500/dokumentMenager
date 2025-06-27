import axios from 'axios'

export const allListDocument = async() => {
    try {
        const res = await axios.get('http://localhost:5000/api/post')
        return {
          status: res.data.status,
          message: res.data.message,
          result: res.data.result
    };
    } catch (err) {
        console.log(err, 'err iz servisa');
        return err;
    }
}