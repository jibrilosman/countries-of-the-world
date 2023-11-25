import axios from 'axios'

const apiUrl = 'https://restcountries.com/v3.1/all'

const fetchData = async () => {
  
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching data:',error);
        throw error;
    }
}
export default fetchData