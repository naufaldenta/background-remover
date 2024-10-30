const express = require('express')
const cors = require('cors')

const app = express();
const apikey = "INPUT YOUR APIKEY"  

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/removebg', async(req, res) => {
    let q = req.query.url;
    let data = await fetch(`https://api.betabotz.eu.org/api/tools/removebg?url=${q}&apikey=${apikey}`);
    res.send(await data.json());
})
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server Work" });
  });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});