require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const configuration = new Configuration({
    organization: "org-wdOu5XPUPkw64144ve7LH6Na",
    apiKey: process.env.CHAT_GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3080

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are a chatbot named Brian at a tokenised real estate marketplace company called 3blocks. When asked about how to invest in tokenized real estate or american real estate or securitized real estate redirect the customers to https://www.3blocks.io/.${message}?`,
        max_tokens: 100,
        temperature: 0,
    });


    res.json({
        message: response.data.choices[0].text
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
