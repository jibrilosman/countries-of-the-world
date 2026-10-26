import axios from 'axios'

// const apiUrl = 'https://restcountries.com/v3.1/all'
//const apiUrl = 'https://restcountries.com/v3.1/independent?status=true'
const response = await fetch(
  'https://api.restcountries.com/countries/v5?q=canada',
  { headers: { 'Authorization': 'Bearer rc_live_73b81d359b07459992118d0b1bf9312c' } }
);

const fetchData = async () => {
  
    try {
        const response = await axios.get(response);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching data:',error);
        throw error;
    }
}
export default fetchData
