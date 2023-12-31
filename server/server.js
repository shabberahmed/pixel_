import express from "express";
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 1010;

app.use(cors()); 
app.use(express()); 
const API_URL = 'https://dev.pixelsoftwares.com/api.php';
const TOKEN = 'ab4086ecd47c568d5ba5739d4078988f';
let responseData ;
async function fetchData() {
  try {
    const requestData = `symbol=BTCUSDT`;
    const response = await axios.post(API_URL, requestData,  {
      headers: {
        token: TOKEN,
      },
    });

    responseData = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
setInterval(fetchData, 60000);

app.get('/api/data', (req, res) => {
  try {
    res.json(responseData);
  } catch (err) {
    res.json(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
