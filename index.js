import connectDB from './src/DB/database.js'
import app from './utils/app.js'

connectDB()

app.get('/', (req, res) => {
    res.send("Starting Our Project")
})

app.listen(3000, () => {
    console.log(`Server Running at 3000`)
})