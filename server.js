const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3300;
const scopusApiKey = process.env.SCOPUS_API_KEY;

app.use(cors({
    credentials: true
}));

app.use(bodyParser.json());

app.post('/scopus', async (req, res) => {
    const { query } = req.body;
    try {
        const response = await axios.get(`https://api.elsevier.com/content/search/scopus`, {
            params: { query },
            headers: { 'X-ELS-APIKey': scopusApiKey }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});