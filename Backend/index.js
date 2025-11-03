const express = require("express")
const dbConnect = require("./connectDB");
const taskRouter = require("./routes/tasks");
const cors = require("cors")
// const userRouter = require("./routes/users");

const app = express()

dbConnect();

app.use(express.json())
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use("/tasks", taskRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})