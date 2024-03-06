const PORT = process.env.PORT || 3001
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

app.post( "/gemini", async (req, res) => {
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const chat = model.startChat({
        history: req.body.history
})
    const msg = req.body.message;
        const result = await chat.sendMessage(msg);
        const response =  result.response.text();
        res.send(response);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  
})